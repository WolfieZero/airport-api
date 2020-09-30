import { resolve } from 'path';

export const AIRPORT_DATA_URL = 'https://datahub.io/core/airport-codes/r/airport-codes.json';
export const COUNTRY_DATA_URL = 'https://datahub.io/core/country-codes/r/country-codes.json';
export const AIRPORT_DATA_FILE = resolve(__dirname, '../data/airports.json');
export const COUNTRY_DATA_FILE = resolve(__dirname, '../data/countries.json');
export const SQLITE_FILE = resolve(__dirname, '../data/airports.db');
export const NUMBER_OF_GENERATE_REVIEWS = 100;
export const DEFAULT_LIMIT = 25;
export const MAX_LIMIT = 200;
export const BUSY_AIRPORTS = [
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
];
