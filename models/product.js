'use strict';
const {
  Model
} = require('sequelize');
const favorite = require('./favorite');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Comment, { foreignKey: 'productId' })
      Product.belongsToMany(models.User, {
        through: models.Favorite, //透過Favorite model
        foreignKey: 'productId', // 在Favorite 中用 productId 查詢
        as: 'FavoritedUsers' // 找到的項目
      })
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