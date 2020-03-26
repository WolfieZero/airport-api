const { AirportModel } = require('../models');
const { DEFAULT_LIMIT, MAX_LIMIT } = require('../config');

/**
 * Add a airport.
 */
const addAirport = async (request, response, next) => {
  let json = {};
  let status = 500;

  try {
    json = await AirportModel.create(request.body);
    status = 201;
  } catch (error) {
    json = {
      error: 'Cannot add airport',
      reason: error.message.split('\n'),
    };
    status = 400;
  }

  response.status(status).send(json);
  next();
};

/**
 * View all airports.
 */
const getAirports = async (request, response, next) => {
  const { records = DEFAULT_LIMIT, page = 0 } = request.query;
  const limit = records > MAX_LIMIT ? MAX_LIMIT : records;
  const offset = page * limit || 0;
  try {
    const airports = await AirportModel.findAll({ limit, offset });
    response.send(airports);
    next();
  } catch (error) {
    console.error(error.message);
    response.sendStatus(500) && next(error);
  }
};

/**
 * Get a single airport.
 */
const getAirport = async (request, response, next) => {
  const { airportIdentifier } = request.params;
  const { include = '' } = request.query;
  try {
    const airport = await AirportModel.getAirportByIdentifier(
      airportIdentifier
    );
    const includes = include.split(',');
    if (includes.includes('reviews')) {
      airport.dataValues.reviews = await airport.getReviews();
    }
    response.send(airport);
    next();
  } catch (error) {
    response.sendStatus(404);
    next(error);
  }
};

const updateAirport = async (request, response, next) => {
  let json = {};
  let status = 500;

  try {
    const airport = Object.assign({}, request.body);
    json = await AirportModel.update({}, { where: { subject:  }})
    status = 200;
  } catch (error) {
    json = {
      error: 'Cannot add airport',
      reason: error.message.split('\n'),
    };
    status = 400;
  }

  response.status(status).send(json);
  next();
};

/**
 * Get all reviews for an airport
 */
const getReviews = async (request, response, next) => {
  const { airportIdentifier } = request.params;
  try {
    const airport = await AirportModel.getAirportByIdentifier(
      airportIdentifier
    );
    const reviews = await airport.getReviews();
    response.send(reviews);
    next();
  } catch (error) {
    console.error(error.message);
    response.sendStatus(500) && next(error);
  }
};

module.exports = {
  addAirport,
  updateAirport,
  getAirports,
  getAirport,
  getReviews,
};
