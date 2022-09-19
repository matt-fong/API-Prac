'use strict';

const reviews = [
  {
    userId: 1,
    spotId: 1,
    review: "Great location with great hosts! They were very responsive with any questions. And the house was very comfortable with everything we needed. Definitely recommend!",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 2,
    review: "Beautiful Airbnb, thoughtfully renovated and decorated. Very nice for a small family reunion. We used the back patio every night, the string lights and fireflies were absolutely magical. ",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 3,
    review: "We really enjoyed this house very much. It was clean and well stocked. The living room upstairs was bright and open and it felt like a treehouse.",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 4,
    review: "The house was beautiful, had everything we needed and was within walking distance to so many things. Our active kids especially loved the tire swing off the deck and a park that was a 5 minute walk away.",
    stars: 5,
  },
  {
    userId: 5,
    spotId: 5,
    review: "The house is welcoming with a well-stocked pantry, fun games, and a serene garden where we saw deer and smelled lavender. My city kids did not want to leave, and we hope to return.",
    stars: 5,
  },
  {
    userId: 6,
    spotId: 6,
    review: "A lovely and cozy escape from the city! Emma is an incredibly hospitable host between the most impressive guest guide, wine, and cookies, and a home filled with thoughtful touches. ",
    stars: 5,
  },
  {
    userId: 7,
    spotId: 7,
    review: "This getaway house was perfect for a small group of friends. We utilized every part of the house to our advantage. The outside patio was beautifully furnished and great for all meals.",
    stars: 5,
  },
  {
    userId: 8,
    spotId: 8,
    review: "Exceeded our expectations! The pictures are beautiful, but the actual space is even better. Filled with light and thoughtfully decorated for style and comfort, we had such an amazing stay.",
    stars: 5,
  },
  {
    userId: 9,
    spotId: 9,
    review: "A very nice and well maintained house within walking distance of shops and restaurants. Would stay again.",
    stars: 5,
  },
  {
    userId: 10,
    spotId: 10,
    review: "This home is stunning! All the amenities are amazing and you feel totally at home here. There was an amazing deck with outdoor dining and a fire place that allowed us to come together and have a great time!",
    stars: 5,
  },
  {
    userId: 11,
    spotId: 11,
    review: "Our stay was great. The house is beautiful and communication was easy. Good places to eat near by. Definitely recommend!",
    stars: 5,
  },
  {
    userId: 12,
    spotId: 12,
    review: "Our stay was AMAZING. So glad that we were able to stay at this lovely place. 10/10 would recommend to anyone looking to stay in the area.",
    stars: 5,
  },
  {
    userId: 13,
    spotId: 13,
    review: "Wonderful home - very cozy with lots of nice indoor and outdoor space for reading and board games! Easy walk into town yet it feels so secluded and private. Stylishly decorated with high-quality furniture and great kitchen.",
    stars: 5,
  },
  {
    userId: 14,
    spotId: 14,
    review: "The house has absolutely everything you need for a great stay. No detail was over looked. Highly recommend if you are looking to relax and hang out/cook outside",
    stars: 5,
  },
  {
    userId: 15,
    spotId: 15,
    review: "Amazing place for a getaway. I really didn't want to leave! The pool, the fireplace, the soaking tub, the quiet nature surrounding us, the heated floors, and all of the amenities provided made this a wonderful place. I can't wait to return.",
    stars: 5,
  },
  {
    userId: 16,
    spotId: 16,
    review: "Great place to get away and relax! Beautiful place with all the luxuries of home, yet in a perfectly tranquil setting.",
    stars: 5,
  },
  {
    userId: 17,
    spotId: 17,
    review: "This is an amazing place, the decor, the pool, and the small details are all great. Super responsive host. Had a wonderful experience and would come back.",
    stars: 5,
  },
  {
    userId: 18,
    spotId: 18,
    review: "The warmth, amenities, and attention to detail made our stay feel truly special. Also, Tina is an incredible host and answered our pre-trip questions almost immediately. We loved the house and hope to stay again!",
    stars: 5,
  },
  {
    userId: 19,
    spotId: 19,
    review: "We absolutely loved our stay here. The house is beautiful and super clean. The outdoor pool, soaking tub, and indoor fireplace were all awesome. Tina is a great communicator and I would recommend this place to anyone.",
    stars: 5,
  },
  {
    userId: 20,
    spotId: 20,
    review: "We had such a wonderful time. Beautiful house and super clean. The main bedroom was beautiful and the outdoor area by the pool was so relaxing.",
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
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    })
  }
};
