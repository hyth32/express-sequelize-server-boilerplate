const { Sequelize } = require('@sequelize/core')
const dotenv = require('dotenv')
const config = require('./config/config.js')[process.env.NODE_ENV || 'development']

dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
})

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Подключение к базе данных успешно установлено.')
  } catch (error) {
    console.error('Не удалось подключиться к базе данных:', error)
    process.exit(1)
  }
}

module.exports = { sequelize, connectDB }
