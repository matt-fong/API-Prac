'use strict';

const reviews = [
  {
    userId: 1,
    spotId: 2,
    review: "First Review",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 1,
    review: "Second Review",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 3,
    review: "Third review",
    stars: 5,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', reviews, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete()
  }
};
