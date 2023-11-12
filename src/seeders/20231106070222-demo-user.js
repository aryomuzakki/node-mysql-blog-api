'use strict';

const { hashSync } = require('bcryptjs');

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          username: "aryo.muzakki",
          email: "aryo.muzakki@gmail.com",
          password: hashSync("aryo123"),
        },
        {
          username: "aryo_1",
          email: "aryo1@gmail.com",
          password: hashSync("aryo123"),
        },
      ],
      {
        validate: true
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
