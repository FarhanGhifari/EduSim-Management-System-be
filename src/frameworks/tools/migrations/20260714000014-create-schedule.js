'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedule', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'modules',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      schedule_type: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      duration_minutes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      max_question: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      is_locked: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedule');
  }
};
