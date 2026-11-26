const XLSX = require("xlsx");
const AppError = require("../../../frameworks/helpers/app-error");

module.exports = async (repositories, file, defaultAuthor = "Admin - Admin") => {
  const { questionRepository } = repositories;

  if (!file) {
    throw new AppError("File wajib diunggah", 422);
  }

  const fileExtension = file.originalname.split(".").pop().toLowerCase();
  if (!["xlsx", "xls", "csv"].includes(fileExtension)) {
    throw new AppError(
      "Format file tidak didukung. Harus berupa .xls, .xlsx, atau .csv",
      422
    );
  }

  const workbook = XLSX.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Read headers to validate
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const headers = [];
  const R = range.s.r;
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
    let hdr = "UNKNOWN " + C;
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr.trim());
  }

  const requiredHeaders = [
    "Module ID",
    "Form Type",
    "Question",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Correct Answer",
  ];

  const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));

  if (missingHeaders.length > 0) {
    throw new AppError(
      `Format file tidak valid. Kolom berikut tidak ditemukan: ${missingHeaders.join(", ")}`,
      422
    );
  }

  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  const errors = [];
  const questionsToCreate = [];

  // Cache module IDs to avoid repeated DB queries
  const moduleCache = {};

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNumber = i + 2; 

    const moduleId = row["Module ID"]
      ? parseInt(row["Module ID"].toString().trim())
      : null;
    const rawType = (row["Form Type"] || "").toString().trim();
    const formType = rawType.replace("-", "_").toLowerCase();
    const questionText = (row["Question"] || "").toString().trim();
    const opt1 = (row["Option 1"] || "").toString().trim();
    const opt2 = (row["Option 2"] || "").toString().trim();
    const opt3 = (row["Option 3"] || "").toString().trim();
    const opt4 = (row["Option 4"] || "").toString().trim();
    const correctAnswer = row["Correct Answer"]
      ? parseInt(row["Correct Answer"].toString().trim())
      : null;

    // Validate module_id
    if (!moduleId || isNaN(moduleId) || moduleId <= 0) {
      errors.push(`Baris ${rowNumber}: Kolom 'Module ID' tidak boleh kosong dan harus berupa angka positif (lebih besar dari 0).`);
    } else {
      if (moduleCache[moduleId] === undefined) {
        const moduleExists = await questionRepository.findModuleById(moduleId);
        moduleCache[moduleId] = !!moduleExists;
      }
      if (!moduleCache[moduleId]) {
        errors.push(`Baris ${rowNumber}: Module ID '${moduleId}' tidak ditemukan di database.`);
      }
    }

    // Validate form_type
    if (!formType) {
      errors.push(`Baris ${rowNumber}: Kolom 'Form Type' tidak boleh kosong.`);
    } else if (!["pre_test", "post_test"].includes(formType)) {
      errors.push(
        `Baris ${rowNumber}: Form Type '${rawType}' tidak valid. Harus 'pre_test' atau 'post_test'.`
      );
    }

    // Validate question
    if (!questionText) {
      errors.push(`Baris ${rowNumber}: Kolom 'Question' tidak boleh kosong.`);
    }

    // Validate options
    if (!opt1) errors.push(`Baris ${rowNumber}: Kolom 'Option 1' tidak boleh kosong.`);
    if (!opt2) errors.push(`Baris ${rowNumber}: Kolom 'Option 2' tidak boleh kosong.`);
    if (!opt3) errors.push(`Baris ${rowNumber}: Kolom 'Option 3' tidak boleh kosong.`);
    if (!opt4) errors.push(`Baris ${rowNumber}: Kolom 'Option 4' tidak boleh kosong.`);

    // Validate correct answer
    if (!correctAnswer || isNaN(correctAnswer)) {
      errors.push(
        `Error pada baris ${rowNumber}: Tidak ada kunci jawaban yang dipilih.`
      );
    } else if (correctAnswer < 1 || correctAnswer > 4) {
      errors.push(
        `Baris ${rowNumber}: Correct Answer '${correctAnswer}' tidak valid. Harus 1, 2, 3, atau 4.`
      );
    }

    // If no errors so far, prepare question data
    const options = [
      { answer: opt1, is_correct: correctAnswer === 1 },
      { answer: opt2, is_correct: correctAnswer === 2 },
      { answer: opt3, is_correct: correctAnswer === 3 },
      { answer: opt4, is_correct: correctAnswer === 4 },
    ];

    questionsToCreate.push({
      module_id: moduleId,
      form_type: formType,
      question: questionText,
      status: true,
      author: (row["Author"] || "").toString().trim() || defaultAuthor,
      options,
    });
  }

  if (errors.length > 0) {
    throw new AppError(errors.join(". "), 422);
  }

  // Execute all inserts in a single transaction
  await questionRepository.transaction(async (t) => {
    for (const questionData of questionsToCreate) {
      const { options, ...questionPayload } = questionData;

      const question = await questionRepository.create(questionPayload, {
        transaction: t,
      });

      const optionsWithQuestionId = options.map((opt) => ({
        ...opt,
        question_id: question.id,
      }));

      await questionRepository.bulkCreateOptions(optionsWithQuestionId, {
        transaction: t,
      });
    }
  });

  return {
    status: "success",
    message: `${questionsToCreate.length} soal berhasil diimport.`,
  };
};
