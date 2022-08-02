'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'Users' },
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        unique: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: '',
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: '',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};
