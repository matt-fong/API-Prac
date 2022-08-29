'use strict';

const reviews = [
  {
    userId: 1,
    spotId: 1,
    review: "First Review",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 2,
    review: "Second Review",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 3,
    review: "Third review",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 4,
    review: "Fourth review",
    stars: 5,
  },
  {
    userId: 5,
    spotId: 5,
    review: "Fifth review",
    stars: 5,
  },
  {
    userId: 6,
    spotId: 6,
    review: "Sixth review",
    stars: 5,
  },
  {
    userId: 7,
    spotId: 7,
    review: "Seventh Review",
    stars: 5,
  },
  {
    userId: 8,
    spotId: 8,
    review: "Eighth Review",
    stars: 5,
  },
  {
    userId: 9,
    spotId: 9,
    review: "Ninth review",
    stars: 5,
  },
  {
    userId: 10,
    spotId: 10,
    review: "Tenth review",
    stars: 5,
  },
  {
    userId: 11,
    spotId: 11,
    review: "Eleventh review",
    stars: 5,
  },
  {
    userId: 12,
    spotId: 12,
    review: "Twelfth review",
    stars: 5,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', reviews, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    })
  }
};
