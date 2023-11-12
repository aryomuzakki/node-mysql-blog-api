'use strict';

const { Comment } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Comment.bulkCreate(
      [
        {
          postId: 1,
          userId: 1,
          comment: "Thank you for the great post",
        },
        {
          postId: 1,
          userId: 2,
          comment: "A wonderful post, thank you for sharing",
        },
        {
          postId: 2,
          userId: 1,
          comment: "This is mind-blowing, my friend need this.",
        },
        {
          postId: 2,
          userId: 2,
          comment: "This is mind-blowing, my friend need this.",
        },
      ],
      {
        validate: true,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  }
};
