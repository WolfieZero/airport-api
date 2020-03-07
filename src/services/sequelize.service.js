const fs = require('fs');
const Sequelize = require('sequelize');
const { SQLITE_FILE } = require('../config');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: SQLITE_FILE,
});

/**
 * Zero out the SQLite file.
 */
sequelize.truncateFile = () => {
  fs.writeFileSync(SQLITE_FILE, '');
  const file = fs.readFileSync(SQLITE_FILE, { encoding: 'utf-8' });
  if (file !== '') {
    throw new Error('SQLite file not truncated');
  }
};

module.exports = sequelize;
