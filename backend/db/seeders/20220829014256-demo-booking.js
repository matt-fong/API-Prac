'use strict';

const bookings = [
 {
   spotId: 1,
   userId: 1,
   startDate: new Date('2022-02-12'),
   endDate: new Date('2022-02-14'),
 },
 {
   spotId: 2,
   userId: 2,
   startDate: new Date('2022-07-04'),
   endDate: new Date('2022-07-14'),
 },
 {
   spotId: 3,
   userId: 3,
   startDate: new Date('2022-03-11'),
   endDate: new Date('2022-04-11'),
 },
 {
  spotId: 4,
  userId: 4,
  startDate: new Date('2021-03-11'),
  endDate: new Date('2021-04-11'),
},
{
  spotId: 5,
  userId: 5,
  startDate: new Date('2022-01-11'),
  endDate: new Date('2022-01-15'),
},
{
  spotId: 6,
  userId: 6,
  startDate: new Date('2022-10-11'),
  endDate: new Date('2022-10-20'),
},
{
  spotId: 7,
  userId: 7,
  startDate: new Date('2022-02-17'),
  endDate: new Date('2022-03-14'),
},
{
  spotId: 8,
  userId: 8,
  startDate: new Date('2023-01-04'),
  endDate: new Date('2023-02-14'),
},
{
  spotId: 9,
  userId: 9,
  startDate: new Date('2022-09-15'),
  endDate: new Date('2022-09-17'),
},
{
 spotId: 10,
 userId: 10,
 startDate: new Date('2021-01-18'),
 endDate: new Date('2021-07-11'),
},
{
 spotId: 11,
 userId: 11,
 startDate: new Date('2023-01-17'),
 endDate: new Date('2023-04-15'),
},
{
 spotId: 12,
 userId: 12,
 startDate: new Date('2022-03-03'),
 endDate: new Date('2022-04-04'),
},
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', bookings, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    })
  }
};
