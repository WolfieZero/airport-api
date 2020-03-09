const { AirportModel } = require('../models');

const getReviews = async (request, response, next) => {
  const { airportIdentifier } = request.params;
  try {
    const reviews = await AirportModel.getAirportByIdentifier(
      airportIdentifier,
      true
    );
    response.send(reviews);
    next();
  } catch (error) {
    console.error(error.message);
    response.sendStatus(500) && next(error);
  }
};

module.exports = {
  getReviews,
};
