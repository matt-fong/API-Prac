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
{
  spotId: 13,
  userId: 13,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
 {
  spotId: 14,
  userId: 14,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
 {
  spotId: 15,
  userId: 15,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
 {
  spotId: 16,
  userId: 16,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
 {
  spotId: 17,
  userId: 17,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
 {
  spotId: 18,
  userId: 18,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
 {
  spotId: 19,
  userId: 19,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
 {
  spotId: 20,
  userId: 20,
  startDate: new Date('2022-03-03'),
  endDate: new Date('2022-04-04'),
 },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', bookings, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
