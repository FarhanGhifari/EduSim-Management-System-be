"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const permissionsRoleLinks = [
      {
        id: 1,
        permission_id: 1, 
        role_id: 1, 
      },
      {
        id: 2,
        permission_id: 2, 
        role_id: 1, 
      },
      {
        id: 3,
        permission_id: 3, 
        role_id: 1, 
      },
      {
        id: 4,
        permission_id: 4, 
        role_id: 1, 
      },
      {
        id: 5,
        permission_id: 5, 
        role_id: 1, 
      },
      {
        id: 6,
        permission_id: 6, 
        role_id: 1, 
      },
      {
        id: 7,
        permission_id: 7, 
        role_id: 1, 
      },
      {
        id: 8,
        permission_id: 8, 
        role_id: 1, 
      },
      {
        id: 9,
        permission_id: 9, 
        role_id: 1, 
      },
      {
        id: 10,
        permission_id: 10, 
        role_id: 1, 
      },
      {
        id: 11,
        permission_id: 11, 
        role_id: 1, 
      },
      {
        id: 12,
        permission_id: 12, 
        role_id: 1, 
      },
    ];

    await queryInterface.bulkInsert("permissions_role_links", permissionsRoleLinks);

    await queryInterface.sequelize.query(
      "SELECT setval('permissions_role_links_id_seq', (SELECT MAX(id) FROM permissions_role_links))",
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions_role_links", null, {});
  },
};
