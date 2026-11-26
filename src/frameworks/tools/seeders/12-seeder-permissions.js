"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = [
      {
        id: 1,
        action: "create:users",
      },
      {
        id: 2,
        action: "read:users",
      },
      {
        id: 3,
        action: "update:users",
      },
      {
        id: 4,
        action: "delete:users",
      },
      {
        id: 5,
        action: "create:classes",
      },
      {
        id: 6,
        action: "read:classes",
      },
      {
        id: 7,
        action: "update:classes",
      },
      {
        id: 8,
        action: "delete:classes",
      },
      {
        id: 9,
        action: "create:tests",
      },
      {
        id: 10,
        action: "read:tests",
      },
      {
        id: 11,
        action: "update:tests",
      },
      {
        id: 12,
        action: "delete:tests",
      },
    ];

    await queryInterface.bulkInsert("permissions", permissions);

    await queryInterface.sequelize.query(
      "SELECT setval('permissions_id_seq', (SELECT MAX(id) FROM permissions))",
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
