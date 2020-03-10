const fs = require('fs');
const yamljs = require('yamljs');
const config = require('../config');
const swaggerYml = fs.readFileSync(`${__dirname}/../swagger.yml`, 'utf8');

const replace = Object.assign(
  {
    NPM_TITLE: process.env.npm_package_name,
    NPM_DESCRIPTION: process.env.npm_package_description,
    NPM_VERSION: process.env.npm_package_version,
  },
  config
);

let swagger = swaggerYml;
for (const key of Object.keys(replace)) {
  swagger = swagger.replace(key, replace[key]);
}

const json = yamljs.parse(swagger);
const writeOptions = {
  encoding: 'utf8',
};

fs.writeFileSync(
  `${__dirname}/../../public/swagger.yml`,
  swagger,
  writeOptions
);

fs.writeFileSync(
  `${__dirname}/../../public/swagger.json`,
  JSON.stringify(json),
  writeOptions
);
