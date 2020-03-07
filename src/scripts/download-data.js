const client = require('axios');
const fs = require('fs');

const {
  AIRPORT_DATA_URL,
  AIRPORT_DATA_FILE,
  COUNTRY_DATA_URL,
  COUNTRY_DATA_FILE,
} = require('../config');

const download = (url, file) =>
  client.get(url).then(response => {
    const data = JSON.stringify(response.data);
    fs.writeFileSync(file, data);
  });

download(AIRPORT_DATA_URL, AIRPORT_DATA_FILE);
download(COUNTRY_DATA_URL, COUNTRY_DATA_FILE);
