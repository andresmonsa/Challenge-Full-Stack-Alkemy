require('dotenv').config()

const { DB_PG_USER, DB_PG_PASSWORD, DB_PG_HOST, DB_PG_PORT, DB_PG_DATABASE, DATABASE_URL } = process.env
const Environment = process.env.NODE_ENV

const config = {
  alter: true,
  force: false,

  connectionString: () => {
    return Environment === 'production' ? DATABASE_URL : `postgres://${DB_PG_USER}:${DB_PG_PASSWORD}@${DB_PG_HOST}:${DB_PG_PORT}/${DB_PG_DATABASE}`
  }
}

module.exports = config
