# Airport API

A Node application for testing apps with a real API with large (mostly) real
data set from [DataHub][1]... and geuine [Faker][2] reviews 😉

## Features

- [x] Automatic data creation
- [x] RESTful API
- [x] Easy scrub and restore
- [x] Airport endpoints - create, read (single and list), update and delete
- [x] Country endpoints - read (single and list)
- [x] Review endpoints - create, read (single) and delete
- [x] Swagger
- [ ] Unit tests
- [ ] E2E tests
- [ ] GraphQL

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

## More Data Sources

- https://aviation.stackexchange.com/questions/39745/how-to-programmatically-access-aip-data-metar-taf-notams
- https://www.icao.int/safety/iStars/Pages/Get-NOTAM-Data.aspx
- https://avwx.rest/
- https://aviationweather.gov/dataserver

## Resources

- [Sequelize][3] - ORM solution
- [NestJS][4] - Node.js framework

[1]: https://datahub.io/
[2]: https://github.com/marak/Faker.js/
[3]: https://sequelize.org/
[4]: https://nestjs.com/
