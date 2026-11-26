"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const learningMaterials = [
      {
        id: 1,
        module_id: 6,
        title: "About Processor Intel 7 Gen 11",
        description: "Materi tentang Processor Intel 7 Gen 11 beserta spesifikasi lengkapnya.",
      },
      {
        id: 2,
        module_id: 6,
        title: "About Processor Intel 7 Gen 12",
        description: "Materi tentang Processor Intel 7 Gen 12 beserta spesifikasi lengkapnya.",
      },

      {
        id: 3,
        module_id: 2,
        title: "About Monitor HP",
        description: "Materi panduan penggunaan dan panduan troubleshooting Monitor HP.",
      },

      {
        id: 4,
        module_id: 14,
        title: "About AC Car Denso",
        description: "Materi perbaikan dan pemeliharaan AC Mobil Denso.",
      },

      {
        id: 5,
        module_id: 15,
        title: "Panduan Pemasangan Car Holder",
        description: "Langkah-langkah pemasangan Car Holder pada dashboard mobil.",
      },
    ];

    await queryInterface.bulkInsert("learning_materials", learningMaterials);

    const [seq] = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('learning_materials', 'id') as seq_name",
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (seq && seq.seq_name) {
      await queryInterface.sequelize.query(
        `SELECT setval('${seq.seq_name}', (SELECT MAX(id) FROM learning_materials))`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("learning_materials", null, {});
  },
};
