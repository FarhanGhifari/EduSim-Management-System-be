"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const classes = [
      {
        id: 1,
        name: "Kelas A",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Kelas B",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "Kelas C",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("classes", classes, {});

    await queryInterface.sequelize.query(
      "SELECT setval('classes_id_seq', (SELECT MAX(id) FROM classes))"
    );

    // Assign seeded students to classes
    await queryInterface.sequelize.query(`
      UPDATE user_details
      SET class_id = 1
      WHERE user_id IN (2, 3)
    `);

    await queryInterface.sequelize.query(`
      UPDATE user_details
      SET class_id = ((user_id % 3) + 1)
      WHERE user_id >= 4
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      UPDATE user_details SET class_id = NULL
    `);
    await queryInterface.bulkDelete("classes", null, {});
  },
};
