'use strict';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('wishlist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('wishlist');
  },
};
