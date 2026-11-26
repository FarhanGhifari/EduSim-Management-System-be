"use strict";
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Password123!", 10);

    const users = [
      {
        id: 1,
        username: "admin1",
        password: hashedPassword,
        confirmed: true,
        blocked: false,
        reset_password_token: null,
        confirmation_token: "token-admin-1",
        last_login: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        username: "siswa1",
        password: hashedPassword,
        confirmed: true,
        blocked: false,
        reset_password_token: null,
        confirmation_token: "token-siswa-1",
        last_login: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        username: "siswa_inactive",
        password: hashedPassword,
        confirmed: false,
        blocked: false,
        reset_password_token: null,
        confirmation_token: "token-siswa-inactive",
        last_login: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    for (let i = 4; i <= 53; i++) {
      users.push({
        id: i,
        username:
          faker.internet
            .userName()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "") + i,
        password: hashedPassword,
        confirmed: true,
        blocked: false,
        reset_password_token: null,
        confirmation_token: "token-" + i,
        last_login: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", users);

    const userDetails = [
      {
        id: 1,
        user_id: 1,
        name: "erick",
        date_of_birth: new Date("1995-05-15"),
        registration_number: "12345",
        work_unit: "Pusdatin",
        position: "Staff IT",
        last_education: "S1",
      },
      {
        id: 2,
        user_id: 2,
        name: "budi",
        date_of_birth: new Date("2005-08-20"),
        registration_number: "54321",
        work_unit: "Sekolah A",
        position: "Staff Administrasi",
        last_education: "SMA",
      },
      {
        id: 3,
        user_id: 3,
        name: "ani",
        date_of_birth: new Date("2006-02-10"),
        registration_number: "54322",
        work_unit: "Sekolah A",
        position: "Pustakawan",
        last_education: "SMA",
      },
    ];

    const educations = ["SMA", "D3", "S1", "S2"];
    const positions = [
      "Staff IT",
      "Programmer",
      "Analyst",
      "Staff Administrasi",
      "Teknisi",
      "Kepala Seksi",
      "Pustakawan",
    ];
    for (let i = 4; i <= 53; i++) {
      userDetails.push({
        id: i,
        user_id: i,
        name: faker.name.fullName().toLowerCase(),
        date_of_birth: faker.date.birthdate({ min: 15, max: 50, mode: "age" }),
        registration_number: String(
          faker.helpers.arrayElement([2024, 2025, 2026]),
        ),
        work_unit: faker.company.name(),
        position: positions[Math.floor(Math.random() * positions.length)],
        last_education:
          educations[Math.floor(Math.random() * educations.length)],
      });
    }

    await queryInterface.bulkInsert("user_details", userDetails);

    await queryInterface.sequelize.query(
      "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))",
    );

    await queryInterface.sequelize.query(
      "SELECT setval('user_details_id_seq', (SELECT MAX(id) FROM user_details))",
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_details", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};
