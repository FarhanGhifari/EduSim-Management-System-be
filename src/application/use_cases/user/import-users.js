const XLSX = require("xlsx");
const bcrypt = require("bcryptjs");
const AppError = require("../../../frameworks/helpers/app-error");

module.exports = async (repositories, file) => {
  const { userRepository } = repositories;

  if (!file) {
    throw new AppError("File wajib diunggah", 422);
  }

  const fileExtension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();
  if (!["xlsx", "xls", "csv"].includes(fileExtension)) {
    throw new AppError(
      "Format file tidak didukung. Harus berupa .xls, .xlsx, atau .csv",
      422,
    );
  }

  const workbook = XLSX.read(file.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Read headers to validate
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const headers = [];
  const R = range.s.r; // header row is usually 0
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = worksheet[XLSX.utils.encode_cell({ c: C, r: R })];
    let hdr = "UNKNOWN " + C;
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
    headers.push(hdr.trim());
  }

  const requiredHeaders = [
    "Full Name",
    "Username",
    "Password",
    "Batch Year",
    "Status",
  ];
  const missingHeaders = requiredHeaders.filter(
    (h) => !headers.includes(h),
  );
  if (missingHeaders.length > 0) {
    throw new AppError(
      `Format file tidak valid. Kolom berikut tidak ditemukan: ${missingHeaders.join(", ")}`,
      422,
    );
  }

  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  const errors = [];
  const usersToCreate = [];
  const seenUsernamesInFile = new Set();

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNumber = i + 2;

    const name = (row["Full Name"] || "").toString().trim();
    const username = (row["Username"] || "").toString().trim().toLowerCase();
    const password = (row["Password"] || "").toString();
    const batchYear = (row["Batch Year"] || "").toString().trim();
    const status = (row["Status"] || "").toString().trim();

    if (!name) {
      errors.push(`Baris ${rowNumber}: Kolom 'Full Name' tidak boleh kosong.`);
    } else {
      if (name.length < 3 || name.length > 100) {
        errors.push(`Baris ${rowNumber}: Kolom 'Full Name' harus berukuran 3-100 karakter.`);
      }
      if (!/^[a-zA-Z\s'.]+$/.test(name)) {
        errors.push(`Baris ${rowNumber}: Kolom 'Full Name' tidak boleh mengandung angka atau karakter khusus.`);
      }
    }
    if (!username) {
      errors.push(`Baris ${rowNumber}: Kolom 'Username' tidak boleh kosong.`);
    } else if (username.length < 8 || username.length > 30) {
      errors.push(`Baris ${rowNumber}: Kolom 'Username' harus berukuran 8-30 karakter.`);
    }
    if (!password) {
      errors.push(`Baris ${rowNumber}: Kolom 'Password' tidak boleh kosong.`);
    } else if (password.length < 8) {
      errors.push(`Baris ${rowNumber}: Kolom 'Password' minimal harus 8 karakter.`);
    }
    if (!batchYear) {
      errors.push(`Baris ${rowNumber}: Kolom 'Batch Year' tidak boleh kosong.`);
    } else if (batchYear.length > 20) {
      errors.push(`Baris ${rowNumber}: Kolom 'Batch Year' maksimal harus 20 karakter.`);
    }
    if (!status) {
      errors.push(`Baris ${rowNumber}: Kolom 'Status' tidak boleh kosong.`);
    } else if (status !== "Active" && status !== "Not Active") {
      errors.push(
        `Baris ${rowNumber}: Status '${status}' tidak valid. Harus 'Active' or 'Not Active'.`,
      );
    }

    if (username) {
      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        errors.push(
          `Baris ${rowNumber}: Username hanya boleh mengandung huruf, angka, underscore (_), dan hyphen (-).`,
        );
      }
      if (seenUsernamesInFile.has(username)) {
        errors.push(
          `Baris ${rowNumber}: Username '${username}' duplikat di dalam file.`,
        );
      } else {
        seenUsernamesInFile.add(username);
      }

      const existingUser = await userRepository.findByUsername(username);
      if (existingUser) {
        errors.push(
          `Baris ${rowNumber}: Username '${username}' sudah terdaftar di database.`,
        );
      }
    }

    if (errors.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      usersToCreate.push({
        name,
        username,
        password: hashedPassword,
        batchYear,
        registrationNumber: batchYear,
        status,
        role: "Siswa",
      });
    }
  }

  if (errors.length > 0) {
    const err = new AppError(
      "Proses import dibatalkan karena terdapat data tidak valid.",
      422,
    );
    err.errors = errors;
    throw err;
  }

  await userRepository.importUsers(usersToCreate);

  return {
    status: "success",
    message: "Pengguna berhasil diimport",
  };
};
