const { DataTypes, Model } = require('Sequelize');

const sequelize = require('../services/sequelize.service');
const { AirportModel } = require('../models');

const modelName = 'review';

const attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
};

// const ReviewModel = sequelize.define(modelName, attributes);
class ReviewModel extends Model {
  static init() {
    return super.init(attributes, { sequelize });
  }

  static associate(models) {
    this.airport = this.belongsTo(AirportModel);
  }
}
ReviewModel.init();
// Seems to be a bug with the next line - https://github.com/sequelize/sequelize/issues/11985
// ReviewModel.belongsTo(AirportModel, { as: 'source' });

module.exports = ReviewModel;
