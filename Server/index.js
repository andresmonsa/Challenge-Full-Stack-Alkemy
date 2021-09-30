require('dotenv').config()
require('colors')
const { conn } = require('./src/db.js')
const { force } = require('./config.js')
const server = require('./src/app.js')
const PORT = process.env.PORT || 3002
const { categoriesLoader } = require('./src/loaders/categories')

process.stdout.write('\u001b[2J\u001b[0;0H')

const runServer = async () => {
  try {
    await conn.sync({ force })
    console.log('DB connected'.blue)
  } catch (error) {
    console.log(error)
  }

  await categoriesLoader()

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

runServer()
