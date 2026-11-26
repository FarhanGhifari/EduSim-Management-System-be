"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        id: 1,
        name: "Admin",
        type: "Internal",
        description: "Administrator",
      },
      {
        id: 2,
        name: "Siswa",
        type: "Internal",
        description: "Student",
      },
      {
        id: 3,
        name: "Instruktur",
        type: "External",
        description: "Instructor",
      },
    ];

    await queryInterface.bulkInsert("roles", roles);

    await queryInterface.sequelize.query(
      "SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles))",
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
