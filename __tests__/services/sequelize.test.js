/* eslint-env jest */
const sequelize = require('../../src/services/sequelize.service');

describe('sequelize.service', () => {
  test('It can connect to the database', async done => {
    const results = await sequelize
      .authenticate()
      .then(() => true)
      .catch(() => false);
    expect(results).toBeTruthy();
    done();
  });
});
