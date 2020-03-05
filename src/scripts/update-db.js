const { AIRPORT_DATA_FILE, COUNTRY_DATA_FILE, BUSY_AIRPORTS } = require('../config');
const databaseService = require('../services/database-service');

const addAirports = () => {
  const airports = require(AIRPORT_DATA_FILE);
  const filteredAirports = airports
    .filter(airport => airport.iata_code && airport.iata_code.length === 3);

  const createAirportsTable = databaseService.prepare(`
    CREATE TABLE 'airports' (
      'id'            INTEGER   NOT NULL  PRIMARY KEY   AUTOINCREMENT,
      'name'          TEXT      NOT NULL,
      'iata_code'	    CHAR(3)   NOT NULL,
      'iso_country'   CHAR(2)   NOT NULL,
      'municipality'  TEXT,
      'continent'     CHAR(2)   NOT NULL,
      'coordinates'   TEXT
    );
  `);

  const insertAirport = databaseService.prepare(`
    INSERT INTO airports (
      name, iata_code, iso_country, municipality, continent, coordinates
    ) VALUES (
      @name,  @iata_code, @iso_country, @municipality, @continent, @coordinates
    )
  `);

  createAirportsTable.run();
  databaseService.transaction(airports => {
    airports.forEach(airport => insertAirport.run(airport))
  })(filteredAirports);
};

const addCountries = () => {
  const countries = require(COUNTRY_DATA_FILE);
  const filteredCountries = countries
    .filter(country => country['ISO3166-1-Alpha-2'] && country['ISO3166-1-Alpha-2'].length === 2);

  const createCountriesTable = databaseService.prepare(`
    CREATE TABLE 'countries' (
      'id'            INTEGER   NOT NULL  PRIMARY KEY   AUTOINCREMENT,
      'name'          TEXT,
      'code'          CHAR(2)   NOT NULL  UNIQUE,
      'code_3'        CHAR(3)   NOT NULL  UNIQUE,
      'region'        TEXT,
      'sub_region'    TEXT
    );
  `);

  const insertCountry = databaseService.prepare(`
    INSERT INTO countries (
      name, code, code_3, region, sub_region
    ) VALUES (
      @name, @code, @code_3, @region, @sub_region
    )
  `);

  createCountriesTable.run();
  databaseService.transaction(list => {
    list.forEach(item => insertCountry.run({
      name: item['CLDR display name'],
      code: item['ISO3166-1-Alpha-2'],
      code_3: item['ISO3166-1-Alpha-3'],
      region: item['Region Name'],
      sub_region: item['Sub-region Name']
    }))
  })(filteredCountries);
};

const addReviews = () => {
  const reviews = require('./generate-reviews');

  const busyAirports = (() => {
    let selectAirports = 'SELECT id, iata_code FROM airports WHERE';
    BUSY_AIRPORTS.forEach(airport => {
      selectAirports += ` iata_code = '${airport}' OR`
    })
    selectAirports = selectAirports.substring(0, selectAirports.length - 3);
    return databaseService.prepare(selectAirports).all();
  })()

  const createReviewsTable = databaseService.prepare(`
    CREATE TABLE "reviews" (
      'id'            INTEGER    NOT NULL   PRIMARY KEY   AUTOINCREMENT,
      'name'          TEXT       NOT NULL,
      'email'         TEXT       NOT NULL,
      'rating'        INTERGER   NOT NULL,
      'message'       TEXT       NOT NULL,
      'added'         TEXT       NOT NULL,
      'airport_id'    INTEGER    NOT NULL
    );
  `);

  const insertReview = databaseService.prepare(`
    INSERT INTO reviews (
      name, email, rating, message, added, airport_id
    ) VALUES (
      @name, @email, @rating, @message, @added, @airport_id
    )
  `);

  createReviewsTable.run();
  databaseService.transaction(list => {
    list.forEach(item => insertReview.run(Object.assign(item, {
      airport_id: busyAirports[Math.floor((Math.random() * busyAirports.length))].id
    })))
  })(reviews);
};

databaseService.truncateFile();
addAirports();
addCountries();
addReviews();
