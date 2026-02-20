const knex = require('knex');
const config = require('../database/knexfile');

const db = knex(config.development);
module.exports = db;
