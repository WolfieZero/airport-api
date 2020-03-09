const { AIRPORT_DATA_FILE, COUNTRY_DATA_FILE } = require('../config');
const { AirportModel, CountryModel, ReviewModel } = require('../models');
const sequelize = require('../services/sequelize.service');

// Scrub the data clean
sequelize.truncateFile();

AirportModel.sync({ force: true })
  .then(() => {
    const airports = require(AIRPORT_DATA_FILE);
    const filteredAirports = airports.filter(
      airport => airport.iata_code && airport.iata_code.length === 3
    );

    const finished = [];
    filteredAirports.forEach(airport => {
      finished.push(AirportModel.create(airport));
    });

    return Promise.all(finished);
  })
  .then(ReviewModel.sync({ force: true }))
  .then(AirportModel.getBusyAirports)
  .then(busyAirports => {
    const reviews = require('./generate-reviews');

    const finished = [];
    reviews.forEach(review => {
      finished.push(ReviewModel.create(review));
    });

    return Promise.all(finished).then(createdReviews => {
      // There's probably a better way to do this but it works for now...
      const countBusyAirports = busyAirports.length;
      createdReviews.forEach(createdReview => {
        const index = Math.floor(Math.random() * countBusyAirports);
        // console.log(busyAirports[index].dataValues.name);
        busyAirports[index].setReviews([createdReview]);
      });
    });
  });

CountryModel.sync({ force: true }).then(() => {
  const countries = require(COUNTRY_DATA_FILE);
  const filteredCountries = countries.filter(
    country =>
      country['ISO3166-1-Alpha-2'] && country['ISO3166-1-Alpha-2'].length === 2
  );

  filteredCountries.forEach(country => {
    CountryModel.create({
      name: country['CLDR display name'],
      code: country['ISO3166-1-Alpha-2'],
      code_3: country['ISO3166-1-Alpha-3'],
      region: country['Region Name'],
      sub_region: country['Sub-region Name'],
    });
  });
});
