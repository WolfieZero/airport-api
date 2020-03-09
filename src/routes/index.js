const express = require('express');
const {
  AirportController,
  CountryController,
  // ReviewController,
} = require('../controllers');

const router = express.Router();

router.get('/airports', AirportController.getAirports);
router.get('/airports/:airportIdentifier', AirportController.getAirport);
router.get(
  '/airports/:airportIdentifier/reviews',
  AirportController.getReviews
);

router.get('/countries', CountryController.getCountries);
router.get('/countries/:countryIdentifier', CountryController.getCountry);

module.exports = router;
