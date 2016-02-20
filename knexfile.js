module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  production: {
    client: 'mysql',
    connection: process.env.MYSQLCONNSTR_SFDB,
    pool: {
      min: 2,
      max: 3
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
