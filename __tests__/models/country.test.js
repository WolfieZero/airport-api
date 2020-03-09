/* eslint-env jest */
const { CountryModel } = require('../../src/models');

describe('review.model', () => {
  const countryObject = expect.objectContaining({
    id: expect.any(Number),
    name: expect.any(String),
    code: expect.any(String),
    code_3: expect.any(String),
    region: expect.any(String),
    sub_region: expect.any(String),
  });

  test('Get all countries', async done => {
    const result = await CountryModel.findAll();
    const resultSize = result.length;
    const index = Math.floor(Math.random() * resultSize);
    const randomCountry = result[index];
    expect(resultSize).toBeGreaterThan(100);
    expect(randomCountry).toEqual(countryObject);
    done();
  });

  // Add tests to sainity check the data
});
