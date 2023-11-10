'use strict';

const { hashSync } = require('bcryptjs');

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await User.bulkCreate(
      // "users",
      [
        {
          username: "a_ryo.0",
          email: "aryo.muzakki@gmail.com",
          password: "aryo123",
        },
        {
          username: "aryo.1_23",
          email: "aryo1@gmail.com",
          password: "aryo123",
        },
        // {
        //   username: "NegativeTest",
        //   email: "test false",
        //   password: "123",
        //   // password: hashSync("aryo123"),
        // },
        // {
        //   username: "",
        //   email: "test username empty string",
        //   password: "123",
        //   // password: hashSync("aryo123"),
        // },
      ],
      {
        validate: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  }
};
