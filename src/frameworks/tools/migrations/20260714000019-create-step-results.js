'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('step_results', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      log_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'logs',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      game_object_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      step_name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      is_correct: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('step_results');
  }
};
