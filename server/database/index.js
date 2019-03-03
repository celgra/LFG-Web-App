const knex = require('knex');
const knexStringcase = require('knex-stringcase');

const config = {
    client: 'pg',
    version: '11.2',
    connection: {
      host : '127.0.0.1',
      user : 'Cele',
      password : '',
      database : 'testing'
    }
};

const options = knexStringcase(config);

const database = knex(options);

module.exports = database;