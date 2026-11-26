'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('attempt_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      attempt_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'test_attempts',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'question',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      selected_option_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'question_options',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('attempt_details');
  }
};
