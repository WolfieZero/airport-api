module.exports = {
  AIRPORT_DATA_URL:
    'https://datahub.io/core/airport-codes/r/airport-codes.json',
  COUNTRY_DATA_URL:
    'https://datahub.io/core/country-codes/r/country-codes.json',
  AIRPORT_DATA_FILE: `${__dirname}/../data/airports.json`,
  COUNTRY_DATA_FILE: `${__dirname}/../data/countries.json`,
  SQLITE_FILE: `${__dirname}/../data/airports.db`,
  NUMBER_OF_GENERATE_REVIEWS: 100,
  DEFAULT_LIMIT: 25,
  MAX_LIMIT: 200,
  BUSY_AIRPORTS: [
    'ATL',
    'PEK',
    'LAX',
    'HND',
    'DXB',
    'ORD',
    'LHR',
    'PVG',
    'HKG',
    'CDG',
    'DFW',
    'CAN',
    'ICN',
    'AMS',
    'FRA',
    'SIN',
    'BKK',
    'DEN',
    'DEL',
    'CKG',
    'JFK',
    'KUL',
    'MAD',
    'SFO',
    'CTU',
    'SZX',
    'MCO',
    'SEA',
    'LAS',
    'BCN',
    'YYZ',
    'MCO',
    'EWR',
    'CLT',
    'PHX',
    'IAH',
    'MIA',
  ],
  SERVER: {
    PORT: 3000,
  },
  RESPONSE: {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    ERROR: 500,
  },
};
