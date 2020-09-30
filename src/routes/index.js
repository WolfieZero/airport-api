const express = require('express');
const { AirportController, CountryController, ReviewController } = require('../controllers');

const router = express.Router();

router.post('/airports', AirportController.addAirport);
router.get('/airports', AirportController.getAirports);
router.get('/airports/:airportIdentifier', AirportController.getAirport);
router.put('/airports/:airportIdentifier', AirportController.updateAirport);
router.get('/airports/:airportIdentifier/reviews', ReviewController.getReviews);

router.get('/countries', CountryController.getCountries);
router.get('/countries/:countryIdentifier', CountryController.getCountry);

router.post('/reviews', ReviewController.addReview);
// router.get('/reviews/', ReviewController.getReviews);
// router.get('/reviews/:reviewIdentifier', ReviewController.getReview);

module.exports = router;
