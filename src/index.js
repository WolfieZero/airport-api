// @ts-nocheck
const express = require('express');

const { SERVER } = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));

app.use('/api', routes);

app.listen(SERVER.PORT, () => console.log(`http://localhost:${SERVER.PORT}`)); // eslint-disable-line no-console

module.exports = { app };
