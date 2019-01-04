const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const roomsRouter = require('./routes/rooms')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/rooms', roomsRouter)

mongoose.set('useNewUrlParser', true)
mongoose.connect('mongodb://localhost:27017/posts')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

module.exports = app
