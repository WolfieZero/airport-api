const { CountryModel } = require('../models');
const { DEFAULT_LIMIT, MAX_LIMIT } = require('../config');

/**
 * ...
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const getCountries = async (request, response, next) => {
  const { records = DEFAULT_LIMIT, page = 0 } = request.query;
  try {
    const limit = records > MAX_LIMIT ? MAX_LIMIT : records;
    const offset = page * limit || 0;
    const airports = await CountryModel.findAll({ limit, offset });
    response.send(airports);
    next();
  } catch (error) {
    console.error(error.message);
    response.sendStatus(500) && next(error);
  }
};

/**
 * ...
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const getCountry = async (request, response, next) => {
  const { countryIdentifier } = request.params;
  try {
    const airport = await CountryModel.getCountryByIdentifier(countryIdentifier);
    response.send(airport);
    next();
  } catch (error) {
    response.sendStatus(404);
    next(error);
  }
};

module.exports = {
  getCountries,
  getCountry,
};
