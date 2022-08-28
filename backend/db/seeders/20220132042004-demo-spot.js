'use strict';

const spots = [
  {
    ownerId: 1,
    address: "1 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 57.7651358,
    lng: -522.4730121,
    name: "House 1",
    description: "Adorable home that is move-in ready and waiting for you to put your own personal touches on. Gorgeous and well-maintained landscaped park-like setting with lush green grasses with a community pool and spa to enjoy.",
    price: 100,
  },
  {
    ownerId: 2,
    address: "2 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 70.9445258,
    lng: -380.6730325,
    name: "House 2",
    description: "The indoor/outdoor living is ideal from this sunny locale with front, side and backyards that are super sunny with pathways and perfect for gardening or entertaining!",
    price: 200,
  },
  {
    ownerId: 3,
    address: "3 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -531.4487327,
    name: "House 3",
    description: "The first floor features a lovely, spacious living room with a fireplace. The dining room has wainscoting, natural woodwork and a built in hutch plus a first floor sun room or den. A wonderful gourmet kitchen with all of the amenities including stainless steel appliances and granite.",
    price: 300,
  },
  {
    ownerId: 4,
    address: "4 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -541.4487427,
    name: "House 4",
    description: "Fabulous location, walking distance to the prestigious Roxbury Latin School. Easy access to commuter rail, public transportation, and restaurants.",
    price: 400,
  },
  {
    ownerId: 5,
    address: "5 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -551.4487527,
    name: "House 5",
    description: "The indoor/outdoor living is ideal from this sunny locale with front, side and backyards that are super sunny with pathways and perfect for gardening or entertaining!",
    price: 500,
  },
  {
    ownerId: 6,
    address: "6 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -561.4487627,
    name: "House 6",
    description: "Stroll to beach, Gayles bakery, parks, schools & churches from this adorable beach home!",
    price: 600,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', spots, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['House1', 'House2', 'House3', 'House4', 'House5', 'House6'] }
    })
  }
};
