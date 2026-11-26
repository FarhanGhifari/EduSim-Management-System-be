"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersRoleLinks = [
      {
        id: 1,
        user_id: 1, 
        role_id: 1, 
      },
      {
        id: 2,
        user_id: 2, 
        role_id: 2, 
      },
      {
        id: 3,
        user_id: 3, 
        role_id: 2, 
      },
    ];

    for (let i = 4; i <= 53; i++) {
      usersRoleLinks.push({
        id: i,
        user_id: i,
        role_id: 2, 
      });
    }

    await queryInterface.bulkInsert("users_role_links", usersRoleLinks);

    await queryInterface.sequelize.query(
      "SELECT setval('users_role_links_id_seq', (SELECT MAX(id) FROM users_role_links))",
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_role_links", null, {});
  },
};
