const Airport = require('../../src/models/airport.model');

describe('airport.model', () => {
  test('Query airports table', async done => {
    const results = await Airport.findAll({
      where: {
        iata_code: 'LHR',
      },
    });
    console.log(results);
    done();
  });
});
