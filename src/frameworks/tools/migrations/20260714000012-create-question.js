'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('question', {
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
      question: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      form_type: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      author: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'Developer'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('question');
  }
};
