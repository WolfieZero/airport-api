# Airport API

A Node application for testing apps with a real API with large (mostly) real
data set from [DataHub][1] - okay, reviews are [Faker][2].

## Features

- Automatic data creation
- RESTful API
- Easy scrub and restore

## Usage

This assumes you have Node v10.\* installed

### Starting app

1. `git clone` the project locally
2. Run `npm i` within the root directory
3. Once finished, run `npm start` and the application is good to go

### Reset the data

1. Run `npm run reset` in the root directory
2. The SQLite database will be scrubbed clean and the data rebuilt with the
   latest dataset
3. This will also update the Swagger docs

## Todo

- [ ] REST API
  - [x] Get request for all Airports
  - [x] Get request for an Airport
  - [x] Get request for an Airport with Reviews
  - [ ] Post request for Airport
  - [ ] Put reqeuest for Airport
  - [x] Get request for all Coutries
  - [x] Get request for a Coutry
  - [x] Get request for all Reviews from Airport
  - [ ] Get request for a Review
  - [ ] Put request for Review
- [ ] Add GraphQL support (express-graphql???)
- [x] Add Swagger support

[1]: https://datahub.io/
[2]: https://github.com/marak/Faker.js/
