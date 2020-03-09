const { DataTypes, Op, col } = require('Sequelize');
const sequelize = require('../services/sequelize.service');
const { BUSY_AIRPORTS } = require('../config');
const ReviewModel = require('./review.model');

const modelName = 'airport';

/**
 * @typedef {Object} Airport
 * @property {string} name
 * @property {string} iata_code
 * @property {string} ident
 * @property {string} iso_country
 * @property {string} municipality
 * @property {string} continent
 * @property {string} continent
 * @property {string} coordinates
 */
const attributes = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iata_code: {
    type: DataTypes.CHAR(3),
    allowNull: false,
  },
  ident: {
    type: DataTypes.CHAR(4),
    allowNull: false,
  },
  iso_country: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  municipality: {
    type: DataTypes.TEXT,
  },
  continent: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.TEXT,
  },
};

const AirportModel = sequelize.define(modelName, attributes);
AirportModel.hasMany(ReviewModel);

/**
 * @returns {Promise<Airport[]>}
 */
AirportModel.getBusyAirports = () => {
  const airports = BUSY_AIRPORTS.map(iata_code => ({ iata_code })); // eslint-disable-line camelcase

  const queryPromise = AirportModel.findAll({
    where: {
      [Op.or]: airports,
    },
  });

  return queryPromise;
};

/**
 * Returns a single airport.
 *
 * @param {string | number} identifier Either an id, icao_code or ident
 * @returns {Promise<Airport>}
 */
AirportModel.getAirportByIdentifier = (identifier, withReviews = false) => {
  const include = [];
  if (withReviews) {
    include.push({
      model: ReviewModel,
      where: {
        airport_id: col('airport.id'),
      },
    });
  }

  if (typeof identifier === 'number' && identifier > 0) {
    return AirportModel.findByPk(identifier, { include });
  }

  const where = {};

  identifier = identifier.toString();
  switch (identifier.length) {
    case 3:
      where.iata_code = identifier.toUpperCase();
      break;
    case 4:
      where.ident = identifier.toUpperCase();
      break;
    default:
      throw new Error('No valid identifier given (id, iata_code, ident)');
  }

  const queryPromise = AirportModel.findOne({ where, include });
  return queryPromise;
};

module.exports = AirportModel;
