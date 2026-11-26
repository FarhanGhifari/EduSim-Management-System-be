"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const schedules = [
      {
        id: 1,
        module_id: 1,
        class_id: 1,
        title: "Pre-test Motherboard Sesi 1 (Aktif & Unlocked)",
        schedule_type: "pre_test",
        date: new Date("2026-08-15T09:00:00.000Z"),
        duration_minutes: 60,
        max_question: 8,
        status: "Active",
        is_locked: false,
      },
      {
        id: 2,
        module_id: 1,
        class_id: 1,
        title: "Post-test Motherboard Sesi 1 (Aktif & Locked)",
        schedule_type: "post_test",
        date: new Date("2026-08-16T10:00:00.000Z"),
        duration_minutes: 45,
        max_question: 4,
        status: "Active",
        is_locked: true,
      },
      {
        id: 3,
        module_id: 2,
        class_id: 2,
        title: "Pre-test Monitor Sesi 1 (Non-Aktif & Unlocked)",
        schedule_type: "pre_test",
        date: new Date("2026-08-20T08:00:00.000Z"),
        duration_minutes: 60,
        max_question: 5,
        status: "Inactive",
        is_locked: false,
      },
      {
        id: 4,
        module_id: 2,
        class_id: 2,
        title: "Post-test Monitor Sesi 1 (Draft & Locked)",
        schedule_type: "post_test",
        date: new Date("2026-08-22T13:00:00.000Z"),
        duration_minutes: 30,
        max_question: 4,
        status: "Draft",
        is_locked: true,
      },
      {
        id: 5,
        module_id: 3,
        class_id: 3,
        title: "Pre-test Garasi (Aktif & Unlocked)",
        schedule_type: "pre_test",
        date: new Date("2026-08-25T09:30:00.000Z"),
        duration_minutes: 90,
        max_question: 6,
        status: "Active",
        is_locked: false,
      },
      {
        id: 6,
        module_id: 4,
        class_id: 3,
        title: "Pre-test Keyboard (Aktif & Unlocked)",
        schedule_type: "pre_test",
        date: new Date("2026-08-28T11:00:00.000Z"),
        duration_minutes: 60,
        max_question: 7,
        status: "Active",
        is_locked: false,
      },
    ];

    await queryInterface.bulkInsert("schedule", schedules, {});

    await queryInterface.sequelize.query(
      "SELECT setval('schedule_id_seq', (SELECT MAX(id) FROM schedule))"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("schedule", null, {});
  },
};
