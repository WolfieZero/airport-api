const fs = require('fs');
const Database = require('better-sqlite3');
const { SQLITE_FILE } = require('../config');

const databaseService = new Database(SQLITE_FILE, {
  verbose: console.debug,
});

databaseService.truncateFile = () => {
  fs.writeFileSync(SQLITE_FILE, '');
}

module.exports = databaseService;
