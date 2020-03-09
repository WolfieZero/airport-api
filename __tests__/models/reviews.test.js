/* eslint-env jest */
const { ReviewModel } = require('../../src/models');

describe('review.model', () => {
  const reviewObject = expect.objectContaining({
    id: expect.any(Number),
    name: expect.any(String),
    email: expect.any(String),
    rating: expect.any(Number),
    message: expect.any(String),
  });

  test('Get all reviews', async done => {
    const result = await ReviewModel.findAll();
    const resultSize = result.length;
    const index = Math.floor(Math.random() * resultSize);
    const randomReview = result[index];
    expect(resultSize).toBeGreaterThan(10);
    expect(randomReview).toEqual(reviewObject);
    done();
  });
});
