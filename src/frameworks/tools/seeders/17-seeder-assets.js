"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const assets = [
      {
        id: 1,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_processor_11.jpg",
        type: "Image",
        order_index: 1,
      },
      {
        id: 2,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_processor_11.pdf",
        type: "PDF",
        order_index: 2,
      },
      {
        id: 3,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_processor_11.mp4",
        type: "Video",
        order_index: 3,
      },
      {
        id: 4,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_monitor.jpg",
        type: "Image",
        order_index: 1,
      },
      {
        id: 5,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_monitor.mp4",
        type: "Video",
        order_index: 2,
      },
      {
        id: 6,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_monitor.pdf",
        type: "PDF",
        order_index: 3,
      },
      {
        id: 7,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_ac_denso.jpg",
        type: "Image",
        order_index: 1,
      },
      {
        id: 8,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_ac_denso.pdf",
        type: "PDF",
        order_index: 2,
      },
      {
        id: 9,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_car_holder.jpg",
        type: "Image",
        order_index: 1,
      },
      {
        id: 10,
        title: "https://api-minio.10.70.0.45.nip.io/pusdatin/about_car_holder.mp4",
        type: "Video",
        order_index: 2,
      },
    ];

    await queryInterface.bulkInsert("assets", assets);

    const [seq] = await queryInterface.sequelize.query(
      "SELECT pg_get_serial_sequence('assets', 'id') as seq_name",
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (seq && seq.seq_name) {
      await queryInterface.sequelize.query(
        `SELECT setval('${seq.seq_name}', (SELECT MAX(id) FROM assets))`
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("assets", null, {});
  },
};
