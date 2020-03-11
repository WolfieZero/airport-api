// @ts-nocheck
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const { SERVER } = require('./config');
const routes = require('./routes');
const swaggerDocument = require('../public/swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(SERVER.PORT, () => console.log(`http://127.0.0.1:${SERVER.PORT}`)); // eslint-disable-line no-console

module.exports = { app };
