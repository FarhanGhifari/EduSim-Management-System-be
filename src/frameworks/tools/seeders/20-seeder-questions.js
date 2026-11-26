"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const questions = [];
    const questionOptions = [];

    let questionIdCounter = 1;
    let optionIdCounter = 1;

    // Distribusikan soal ke modul utama (1-5), sub module (8), dan content (20)
    const targetModules = [
      { id: 1, label: "Modul Utama (Motherboard)" },
      { id: 2, label: "Modul Utama (Monitor)" },
      { id: 3, label: "Modul Utama (Garasi)" },
      { id: 4, label: "Modul Utama (Keyboard)" },
      { id: 5, label: "Modul Utama (Storage)" },
      { id: 8, label: "Sub Modul (Chipset)" },
      { id: 20, label: "Content (NVMe)" },
    ];

    for (const mod of targetModules) {
      for (let i = 1; i <= 40; i++) {
        const qId = questionIdCounter++;
        const formType = i <= 20 ? "pre_test" : "post_test"; // 20 pre-test & 20 post-test
        const status = qId % 5 !== 0; // 80% aktif, 20% non-aktif

        questions.push({
          id: qId,
          module_id: mod.id,
          question: `Soal nomor ${qId} (${mod.label} - ${formType.toUpperCase()} #${i}): Manakah pernyataan berikut yang paling tepat?`,
          form_type: formType,
          status: status,
          author: "erick - Admin",
          created_at: new Date(),
          updated_at: new Date(),
        });

        // Variasi kunci jawaban (1, 2, 3, atau 4)
        const correctAnswer = ((qId - 1) % 4) + 1;

        // 4 opsi pilihan teks (A, B, C, D) per soal
        for (let ans = 1; ans <= 4; ans++) {
          const letter = String.fromCharCode(64 + ans); // A, B, C, D
          questionOptions.push({
            id: optionIdCounter++,
            question_id: qId,
            answer: `Pilihan ${letter}: Jawaban penjelasan untuk pilihan ${letter} pada soal nomor ${qId}`,
            is_correct: ans === correctAnswer ? "true" : "false",
          });
        }
      }
    }

    await queryInterface.bulkDelete("question_options", null, {});
    await queryInterface.bulkDelete("question", null, {});

    await queryInterface.bulkInsert("question", questions, {});
    await queryInterface.bulkInsert("question_options", questionOptions, {});

    const [qSeq] = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('question', 'id') as seq_name",
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (qSeq && qSeq.seq_name) {
      await queryInterface.sequelize.query(
        `SELECT setval('${qSeq.seq_name}', (SELECT COALESCE(MAX(id), 1) FROM question))`
      );
    }

    const [optSeq] = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('question_options', 'id') as seq_name",
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (optSeq && optSeq.seq_name) {
      await queryInterface.sequelize.query(
        `SELECT setval('${optSeq.seq_name}', (SELECT COALESCE(MAX(id), 1) FROM question_options))`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("question_options", null, {});
    await queryInterface.bulkDelete("question", null, {});
  },
};
