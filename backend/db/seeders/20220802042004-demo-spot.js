'use strict';

const spots = [
  {
    ownerId: 1,
    address: "123 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.7645358,
    lng: -122.4730327,
    name: "House 1",
    description: "Spot 1",
    price: 123,
  },
  {
    ownerId: 2,
    address: "456 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 40.7645358,
    lng: -120.4730327,
    name: "House 2",
    description: "Spot 2",
    price: 456,
  },
  {
    ownerId: 3,
    address: "3 Disney Lane",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 41.7645358,
    lng: -123.4730327,
    name: "House 3",
    description: "Spot 3",
    price: 789,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', spots, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete()
  }
};
