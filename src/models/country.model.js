const { DataTypes, Model } = require('Sequelize');
const sequelize = require('../services/sequelize.service');

const modelName = 'country';

/**
 * @typedef {Object} Country
 * @property {string} name
 * @property {string} code
 * @property {string} code_3
 * @property {string} region
 * @property {string} sub_region
 */
const attributes = {
  name: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.CHAR(2),
    allowNull: false,
    unique: true,
  },
  code_3: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    unique: true,
  },
  region: {
    type: DataTypes.TEXT,
  },
  sub_region: {
    type: DataTypes.TEXT,
  },
};

class CountryModel extends Model {}
CountryModel.init(attributes, { sequelize, modelName });

/**
 * Returns a single country.
 *
 * @param {string | number} identifier Either an id, code or code_3.
 * @returns {Promise<Country>}
 */
CountryModel.getCountryByIdentifier = identifier => {
  if (typeof identifier === 'number' && identifier > 0) {
    return CountryModel.findByPk(identifier);
  }

  /**
   * @type {Country}
   */
  const where = {};

  identifier = identifier.toString();
  switch (identifier.length) {
    case 2:
      where.code = identifier.toUpperCase();
      break;
    case 4:
      where.code_3 = identifier.toUpperCase();
      break;
    default:
      throw new Error('No valid identifier given (id, code, code_3)');
  }

  const queryPromise = CountryModel.findOne({ where });
  return queryPromise;
};

module.exports = CountryModel;
