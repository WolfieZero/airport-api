const faker = require('faker');
const { NUMBER_OF_GENERATE_REVIEWS } = require('../config');

const reviews = [];

for (let i = 0; i < NUMBER_OF_GENERATE_REVIEWS; i++) {
  reviews.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    rating: Math.floor((Math.random() * 5) + 1),
    message: faker.lorem.paragraphs(),
    added: faker.date.recent().toString(),
  })
}

module.exports = reviews;
