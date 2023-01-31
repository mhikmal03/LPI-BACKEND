// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv').config({path: '../../.././.env'});
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:     'localhost',
      database: 'literacypowerdb',
      user:     'root',
      password: '',
      port:     3307
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
