const bodyParser = require('body-parser');
const express = require('express');

const { SERVER } = require('./config')
// const routes = require('./routes')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.listen(SERVER.PORT, () => console.log(`${process.env.npm_package_name} - http://localhost:${SERVER.PORT}`))

module.exports = { app };
