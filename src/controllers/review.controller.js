const { renderer } = require('../helpers');
const { AirportModel, ReviewModel } = require('../models');

/**
 * Add a airport.
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const addReview = async (request, response, next) => {
  const render = renderer(response, next);

  try {
    const review = await ReviewModel.create(request.body);
    render.accepted(review);
  } catch (error) {
    render.error('Cannot add review', error);
  }
};

/**
 * Get all reviews for an airport
 *
 * @param {object} request Incoming request
 * @param {object} response Server response
 * @param {function} next Pass control to the next handler
 */
const getReviews = async (request, response, next) => {
  const render = renderer(response, next);
  const { airportIdentifier } = request.params;

  try {
    const airport = await AirportModel.getAirportByIdentifier(airportIdentifier);
    const reviews = await airport.getReviews();
    render.ok(reviews);
  } catch (error) {
    render.badRequest('...', error);
  }
};
module.exports = {
  addReview,
  getReviews,
};
