'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('question_options', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
      answer: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_correct: {
        type: Sequelize.STRING(25),
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('question_options');
  }
};
