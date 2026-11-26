"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE "test_attempts" DROP CONSTRAINT IF EXISTS "test_attempts_schedule_id_fkey"'
    );

    await queryInterface.addConstraint("test_attempts", {
      fields: ["schedule_id"],
      type: "foreign key",
      name: "test_attempts_schedule_id_fkey",
      references: {
        table: "schedule",
        field: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER TABLE "test_attempts" DROP CONSTRAINT IF EXISTS "test_attempts_schedule_id_fkey"'
    );

    await queryInterface.addConstraint("test_attempts", {
      fields: ["schedule_id"],
      type: "foreign key",
      name: "test_attempts_schedule_id_fkey",
      references: {
        table: "schedule",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },
};

