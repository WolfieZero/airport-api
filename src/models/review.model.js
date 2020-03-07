const Sequelize = require('Sequelize');
const sequelize = require('../services/sequelize.service');

const modelName = 'review';

const attributes = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  airport_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
};

class ReviewModel extends Sequelize.Model {}
ReviewModel.init(attributes, { sequelize, modelName });

module.exports = ReviewModel;
