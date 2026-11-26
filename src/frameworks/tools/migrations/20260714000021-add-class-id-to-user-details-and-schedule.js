"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userDetailsTable = await queryInterface.describeTable("user_details");
    if (!userDetailsTable.class_id) {
      await queryInterface.addColumn("user_details", "class_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "classes",
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }

    const scheduleTable = await queryInterface.describeTable("schedule");
    if (!scheduleTable.class_id) {
      await queryInterface.addColumn("schedule", "class_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "classes",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    } else if (scheduleTable.class_id.allowNull === false) {
      await queryInterface.changeColumn("schedule", "class_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }

    // Backfill existing schedule rows if classes exist
    await queryInterface.sequelize.query(`
      UPDATE schedule
      SET class_id = (SELECT id FROM classes ORDER BY id ASC LIMIT 1)
      WHERE class_id IS NULL AND EXISTS (SELECT 1 FROM classes)
    `);
  },

  async down(queryInterface, Sequelize) {
    const scheduleTable = await queryInterface.describeTable("schedule");
    if (scheduleTable.class_id) {
      await queryInterface.removeColumn("schedule", "class_id");
    }

    const userDetailsTable = await queryInterface.describeTable("user_details");
    if (userDetailsTable.class_id) {
      await queryInterface.removeColumn("user_details", "class_id");
    }
  },
};

