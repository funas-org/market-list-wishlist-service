'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('wishlist', 'ownerEmail', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'toadjust',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('wishlist', 'ownerEmail');
  },
};
