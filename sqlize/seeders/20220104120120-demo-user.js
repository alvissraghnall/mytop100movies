'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
     await queryInterface.bulkInsert('Users', [{
          name: 'John Doe',
          email: 'johndoe419@yahoo.io',
          password: 'johnthagenius',
          createdAt: new Date(), 
          updatedAt: new Date()
     }]);
     /*
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
  }
};
