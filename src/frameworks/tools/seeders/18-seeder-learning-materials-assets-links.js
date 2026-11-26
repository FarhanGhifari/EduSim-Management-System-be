"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const links = [
      { learning_materials_id: 1, assets_id: 1 },
      { learning_materials_id: 1, assets_id: 2 },
      { learning_materials_id: 1, assets_id: 3 },

      { learning_materials_id: 3, assets_id: 4 },
      { learning_materials_id: 3, assets_id: 5 },
      { learning_materials_id: 3, assets_id: 6 },

      { learning_materials_id: 4, assets_id: 7 },
      { learning_materials_id: 4, assets_id: 8 },

      { learning_materials_id: 5, assets_id: 9 },
      { learning_materials_id: 5, assets_id: 10 },
    ];

    await queryInterface.bulkInsert("learning_materials_assets_links", links);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("learning_materials_assets_links", null, {});
  },
};
