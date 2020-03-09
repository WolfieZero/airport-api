/* eslint-env jest */
const { AirportModel } = require('../../src/models');

describe('airport.model', () => {
  const airportObject = expect.objectContaining({
    id: expect.any(Number),
    iata_code: expect.any(String),
    ident: expect.any(String),
    iso_country: expect.any(String),
    municipality: expect.any(String),
    continent: expect.any(String),
    coordinates: expect.any(String),
  });

  let randomAirport = {};

  test('Get all airports', async done => {
    const result = await AirportModel.findAll();
    const resultSize = result.length;
    const index = Math.floor(Math.random() * resultSize);
    randomAirport = result[index];
    expect(resultSize).toBeGreaterThan(1000);
    expect(result[index]).toEqual(airportObject);
    done();
  });

  test('Get airport using `getAirportByIdentifier()` with `iata_code`', async done => {
    const result = await AirportModel.getAirportByIdentifier('JFK');
    expect(result.ident).toBe('KJFK');
    expect(result).toEqual(airportObject);
    done();
  });

  test('Get airport using `getAirportByIdentifier()` with `ident`', async done => {
    const result = await AirportModel.getAirportByIdentifier('CYUL');
    expect(result.iata_code).toBe('YUL');
    expect(result).toEqual(airportObject);
    done();
  });

  test('Get airport using `getAirportByIdentifier()` with `id`', async done => {
    const result = await AirportModel.getAirportByIdentifier(randomAirport.id);
    expect(result.iata_code).toEqual(randomAirport.iata_code);
    expect(result).toEqual(airportObject);
    done();
  });
});
