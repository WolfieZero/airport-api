const Sequelize = require('Sequelize');
const sequelize = require('../services/sequelize.service');

const modelName = 'country';

const attributes = {
  name: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.CHAR(2),
    allowNull: false,
    unique: true,
  },
  code_3: {
    type: Sequelize.CHAR(3),
    allowNull: false,
    unique: true,
  },
  region: {
    type: Sequelize.TEXT,
  },
  sub_region: {
    type: Sequelize.TEXT,
  },
};

class CountryModel extends Sequelize.Model {}
CountryModel.init(attributes, { sequelize, modelName });

module.exports = CountryModel;
