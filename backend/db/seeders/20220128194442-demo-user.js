'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Lebron',
        lastName: 'James',
        username: 'lebronjames',
        email: 'lebronjames@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Kevin',
        lastName: 'Durant',
        username: 'kevindurant',
        email: 'kevindurant@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Kyrie',
        lastName: 'Irving',
        username: 'kyrieirving',
        email: 'kyrieirving@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Michael',
        lastName: 'Jordan',
        username: 'michaeljordan',
        email: 'michaeljordan@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Steph',
        lastName: 'Curry',
        username: 'stephcurry',
        email: 'stephcurry@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Kobe',
        lastName: 'Bryant',
        username: 'kobebryant',
        email: 'kobebryant@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['lebronjames', 'kevindurant', 'kyrieirving', 'michaeljordan', 'stephcurry', 'kobebryant'] }
    }, {});
  }
};
