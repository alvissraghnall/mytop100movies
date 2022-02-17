'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
    
    return queryInterface.bulkInsert('User_prms', [{
      id: "",
      prm: 'd6523d9cf966b6b1bfa0380da8aa84a0aebd3d912c465f4e839e156e20863ecc',
      createdAt: new Date(),
      updatedAt: new Date()
        }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
