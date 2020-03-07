const { AIRPORT_DATA_FILE, COUNTRY_DATA_FILE } = require('../config');
const sequelize = require('../services/sequelize.service');
const AirportModel = require('../models/airport.model');
const CountryModel = require('../models/country.model');
const ReviewModel = require('../models/review.model');

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
  .then(AirportModel.busyAirports)
  .then(busyAirports => {
    const reviews = require('./generate-reviews');
    reviews.forEach(reivew => {
      ReviewModel.create(
        Object.assign(reivew, {
          airport_id:
            busyAirports[Math.floor(Math.random() * busyAirports.length)]
              .dataValues.id,
        })
      );
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
