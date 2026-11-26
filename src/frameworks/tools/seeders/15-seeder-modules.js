"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const modules = [
      {
        id: 1,
        title: "Motherboard",
        parent_id: null,
        type: "module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: "Monitor",
        parent_id: null,
        type: "module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        title: "Garasi",
        parent_id: null,
        type: "module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        title: "Keyboard",
        parent_id: null,
        type: "module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        title: "Storage",
        parent_id: null,
        type: "module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 6,
        title: "Processor",
        parent_id: 1,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 7,
        title: "RAM",
        parent_id: 1,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 8,
        title: "Chipset",
        parent_id: 1,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 9,
        title: "Mobil",
        parent_id: 3,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 10,
        title: "Motor",
        parent_id: 3,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 11,
        title: "Mechanical",
        parent_id: 4,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 12,
        title: "Membrane",
        parent_id: 4,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 13,
        title: "SSD",
        parent_id: 5,
        type: "sub_module",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 14,
        title: "AC",
        parent_id: 9,
        type: "content",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 15,
        title: "Car Holder",
        parent_id: 9,
        type: "content",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 16,
        title: "Knalpot",
        parent_id: 10,
        type: "content",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 17,
        title: "Cherry MX Red",
        parent_id: 11,
        type: "content",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 18,
        title: "Cherry MX Blue",
        parent_id: 11,
        type: "content",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 19,
        title: "Rubber Dome",
        parent_id: 12,
        type: "content",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 20,
        title: "NVMe",
        parent_id: 13,
        type: "content",
        meta: null,
        count: JSON.stringify(0),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (const mod of modules) {
      const childCount = modules.filter((m) => m.parent_id === mod.id).length;
      mod.count = JSON.stringify(childCount);
    }

    await queryInterface.bulkInsert("modules", modules);

    const [seq] = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('modules', 'id') as seq_name",
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (seq && seq.seq_name) {
      await queryInterface.sequelize.query(
        `SELECT setval('${seq.seq_name}', (SELECT MAX(id) FROM modules))`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("modules", null, {});
  },
};
