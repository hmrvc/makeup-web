'use strict';
const product = require('../products (1).json')
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', product.map(item => {
      return {
        name: item.name,
        brand: item.brand,
        price: item.price,
        image: item.image_link,
        description: item.description,
        created_at: new Date(),
        updated_at: new Date()  
      }
    }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
