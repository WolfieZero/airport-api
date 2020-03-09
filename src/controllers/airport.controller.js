const { AirportModel } = require('../models');
const { DEFAULT_LIMIT, MAX_LIMIT } = require('../config');

const getAirports = async (request, response, next) => {
  const { records = DEFAULT_LIMIT, page = 0 } = request.query;
  try {
    const limit = records > MAX_LIMIT ? MAX_LIMIT : records;
    const offset = page * limit || 0;
    const airports = await AirportModel.findAll({ limit, offset });
    response.send(airports);
    next();
  } catch (error) {
    console.error(error.message);
    response.sendStatus(500) && next(error);
  }
};

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
  getAirports,
  getAirport,
  getReviews,
};
