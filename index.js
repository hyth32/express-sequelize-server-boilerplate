// index.js
const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./db')
const models = require('./models')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello, Express + Sequelize + PostgreSQL!')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Что-то пошло не так!' })
})

const startServer = async () => {
  await connectDB()

  const { sequelize } = require('./models')
  try {
    await sequelize.authenticate()
    console.log('Модели синхронизированы с базой данных.')
  } catch (error) {
    console.error('Ошибка синхронизации моделей:', error)
  }

  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`)
  })
}

startServer()
