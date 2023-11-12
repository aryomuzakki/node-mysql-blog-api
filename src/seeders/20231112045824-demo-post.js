'use strict';

const { Post } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Post.bulkCreate(
      [
        {
          title: "Officia commodo dolor velit in est ea esse commodo elit ex enim aliquip.",
          body: "<p>Qui ullamco aliquip sunt sint qui. Non et eu dolore incididunt proident veniam ipsum culpa eiusmod. Amet ullamco commodo officia fugiat ut laboris magna exercitation reprehenderit incididunt Lorem quis. Enim veniam adipisicing occaecat adipisicing Lorem incididunt irure deserunt. In deserunt labore aliqua occaecat laboris quis non nostrud minim. Ipsum adipisicing amet exercitation nulla cillum proident excepteur.</p>\n<br>\n<p>Mollit est dolore magna excepteur consectetur amet ad exercitation aliqua sint do magna ut deserunt. Id nulla veniam amet ipsum nulla exercitation. Quis culpa qui nisi ea ex aliqua magna ullamco aute sit aliqua proident cillum. Culpa cupidatat officia nulla eiusmod sit anim ad consectetur quis nostrud amet duis. Elit exercitation incididunt minim reprehenderit tempor. Laboris quis ut aliquip quis esse mollit labore eiusmod anim magna fugiat cupidatat. Ex adipisicing non ullamco adipisicing.</p>",
          userId: 1,
        },
        {
          title: "Incididunt occaecat fugiat fugiat enim elit aliqua.",
          body: "<p>Consectetur veniam esse deserunt do esse. Cupidatat est consequat fugiat adipisicing aute pariatur sit ut eu pariatur ullamco non. Eiusmod deserunt pariatur ea pariatur sit proident esse magna quis esse quis id proident id. Labore occaecat enim magna nisi ipsum labore exercitation pariatur id anim occaecat occaecat. Enim sit reprehenderit non nisi ad aliqua voluptate commodo do et laborum laboris. Dolor et enim qui nisi cillum. Amet culpa do eiusmod pariatur laborum.</p>\n<br><p>Aute sit nulla ad aute Lorem voluptate commodo excepteur voluptate tempor. Nulla est adipisicing mollit do. Aute id velit magna in amet aute laborum ut. Sunt est mollit commodo adipisicing. Elit voluptate pariatur nisi pariatur officia excepteur. Commodo veniam id cupidatat qui.</p>",
          userId: 2,
        },
        {
          title: "Nulla cillum sint culpa consectetur mollit aute elit sit cillum.",
          body: "<p>Aliquip ad elit sunt Lorem deserunt reprehenderit velit occaecat ea labore aute occaecat voluptate. Eu duis labore Lorem laboris est consectetur sunt nostrud et sunt. Qui nisi commodo commodo mollit. Anim officia ex dolore laborum sint est nulla veniam duis cillum aute ex eu. Duis sunt cillum velit cupidatat pariatur aute dolore esse quis. Incididunt ipsum fugiat mollit minim. Nostrud ex magna cupidatat commodo tempor laborum reprehenderit sit magna.</p>\n<br>\n<p>Anim et aliquip officia adipisicing aliquip. Incididunt officia officia elit pariatur commodo enim consectetur labore laboris. Irure velit ullamco Lorem culpa mollit.</p>",
          userId: 2,
        },
      ],
      {
        validate: true,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  }
};
