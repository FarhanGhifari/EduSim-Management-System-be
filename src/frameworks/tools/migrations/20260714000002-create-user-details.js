"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_details", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      registration_number: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      work_unit: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      position: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      last_education: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_details");
  },
};
