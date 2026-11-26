'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
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
      score: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      total_step: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      correct_step: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      time_taken: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reports');
  }
};
