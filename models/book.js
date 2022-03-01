'use strict';
var Sequelize = require('sequelize');

const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      /* add Sequlize ORM validation w/ error msg */
      validation: {
        notNull: {
          msg: 'Input for "title" needed',
        },
        notEmpty: {
          msg: 'Proper input for "title" needed',
        }
      },

    }, 
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      /* add Sequlize ORM validation w/ error msg */
      validation: {
        notNull: {
          msg: 'Input for "author" needed',
        },
        notEmpty: {
          msg: 'Proper input for "author" needed',
        }
      }

    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};