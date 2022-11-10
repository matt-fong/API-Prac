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
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Kyrie',
        lastName: 'Irving',
        username: 'kyrieirving',
        email: 'kyrieirving@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Michael',
        lastName: 'Jordan',
        username: 'michaeljordan',
        email: 'michaeljordan@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Steph',
        lastName: 'Curry',
        username: 'stephcurry',
        email: 'stephcurry@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Kobe',
        lastName: 'Bryant',
        username: 'kobebryant',
        email: 'kobebryant@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Chris',
        lastName: 'Paul',
        username: 'chrispaul',
        email: 'chrispaul@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Trae',
        lastName: 'Young',
        username: 'traeyoung',
        email: 'traeyoung@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ja',
        lastName: 'Morant',
        username: 'jamorant',
        email: 'jamorant@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'James',
        lastName: 'Harden',
        username: 'jamesharden',
        email: 'jamesharden@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jimmy',
        lastName: 'Butler',
        username: 'jimmybutler',
        email: 'jimmybutler@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Lamelo',
        lastName: 'Ball',
        username: 'lameloball',
        email: 'lameloball@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jayson',
        lastName: 'Tatum',
        username: 'jaysontatum',
        email: 'jaysontatum@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Luka',
        lastName: 'Doncic',
        username: 'lukadoncic',
        email: 'lukadoncic@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Klay',
        lastName: 'Thompson',
        username: 'klaythompson',
        email: 'klaythompson@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'DeMar',
        lastName: 'DeRozan',
        username: 'demarderozan',
        email: 'demarderozan@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Devin',
        lastName: 'Booker',
        username: 'devinbooker',
        email: 'devinbooker@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Joel',
        lastName: 'Embiid',
        username: 'joelembiid',
        email: 'joelembiid@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jaylen',
        lastName: 'Brown',
        username: 'jaylenbrown',
        email: 'jaylenbrown@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Andrew',
        lastName: 'Wiggins',
        username: 'andrewwiggins',
        email: 'andrewwiggins@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'demouser',
        email: 'demouser@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['lebronjames', 'kevindurant', 'kyrieirving', 'michaeljordan', 'stephcurry', 'kobebryant', 'chrispaul', 'traeyoung', 'jamorant', 'jamesharden', 'jimmybutler', 'lameloball', 'jaysontatum', 'lukadoncic', 'klaythompson', 'demarderozan', 'devinbooker', 'joelembiid', 'jaylenbrown', 'andrewwiggins', 'demouser'] }
    }, {});
  }
};
