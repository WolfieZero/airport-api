const Sequelize = require('Sequelize');
const sequelize = require('../services/sequelize.service');
const { BUSY_AIRPORTS } = require('../config');

const modelName = 'airport';

const attributes = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  iata_code: {
    type: Sequelize.CHAR(3),
    allowNull: false,
  },
  iso_country: {
    type: Sequelize.CHAR(2),
    allowNull: false,
  },
  municipality: {
    type: Sequelize.TEXT,
  },
  continent: {
    type: Sequelize.CHAR(2),
    allowNull: false,
  },
  coordinates: {
    type: Sequelize.TEXT,
  },
};

class AirportModel extends Sequelize.Model {}
AirportModel.init(attributes, { sequelize, modelName });

/**
 * @returns {Promise[Airports]}
 */
AirportModel.getBusyAirports = () => {
  const airports = BUSY_AIRPORTS.map(iata_code => ({ iata_code })); // eslint-disable-line camelcase

  const queryPromise = AirportModel.findAll({
    where: {
      [Sequelize.Op.or]: airports,
    },
  });

  return queryPromise;
};

module.exports = AirportModel;
