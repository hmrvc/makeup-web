'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Comment, { foreignKey: 'productId' })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true,
  });
  return Product;
};