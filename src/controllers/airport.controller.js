const { renderer } = require('../helpers');
const { AirportModel } = require('../models');
const { DEFAULT_LIMIT, MAX_LIMIT } = require('../config');

/**
 * Add a airport.
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const addAirport = async (request, response, next) => {
  const render = renderer(response, next);

  try {
    const airport = await AirportModel.create(request.body);
    render.accepted(airport);
  } catch (error) {
    render.error('Cannot add airport', error);
  }
};

/**
 * View all airports.
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const getAirports = async (request, response, next) => {
  const render = renderer(response, next);
  const { records = DEFAULT_LIMIT, page = 0 } = request.query;
  const limit = records > MAX_LIMIT ? MAX_LIMIT : records;
  const offset = page * limit || 0;

  try {
    const airports = await AirportModel.findAll({ limit, offset });
    render.ok(airports);
  } catch (error) {
    render.error('Cannot get airports', error);
  }
};

/**
 * Get an airport.
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const getAirport = async (request, response, next) => {
  const render = renderer(response, next);
  const { airportIdentifier } = request.params;
  const { include = '' } = request.query;

  try {
    const airport = await AirportModel.getAirportByIdentifier(airportIdentifier);
    const includes = include.split(',');

    if (includes.includes('reviews')) {
      airport.dataValues.reviews = await airport.getReviews();
    }

    render.ok(airport);
  } catch (error) {
    render.notFound(`Cannot find airport with identifier "${airportIdentifier}"`, error);
  }
};

/**
 * Update an airport
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const updateAirport = async (request, response, next) => {
  const render = renderer(response, next);
  const { airportIdentifier } = request.params;

  try {
    const airport = await AirportModel.getAirportByIdentifier(airportIdentifier);
    const airportUpdate = Object.assign({}, request.body);
    const updatedAirport = await airport.update(airportUpdate);
    render.accepted(updatedAirport);
  } catch (error) {
    render.error('Cannot add airport', error);
  }
};

module.exports = {
  addAirport,
  updateAirport,
  getAirports,
  getAirport,
};
