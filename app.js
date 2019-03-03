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

// app.use('/rooms', roomsRouter)

const dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/mrrs'
mongoose.set('useNewUrlParser', true)
mongoose.connect(dbUrl)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

// test
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const Floor = require('./models/floor')
const Room = require('./models/room')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Room {
    code: String,
    name: String,
    description: String,
    capacity: Int,
    floor: String
  }

  type Query {
    rooms: [Room]
  }

  input RoomInput {
    code: String,
    name: String,
    description: String,
    capacity: Int,
    floor: String
  }

  type Mutation {
    addRoom(room: RoomInput): Room
  }
`)

const root = {
  rooms: () => {
    return Room
      .find({}, 'code name description capacity floor')
      // .populate('floor')
      .sort({ _id: -1 })
  },
  addRoom: ({room}) => {
    const newRoom = new Room({
      name: room.name,
      description: room.description,
      floor: room.floor,
      capacity: room.capacity
    })

    return newRoom.save((error) => {
      if (error) console.log(error)
    })
  }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app
