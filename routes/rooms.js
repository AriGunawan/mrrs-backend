const express = require('express')
const router = express.Router()
const Floor = require('../models/floor')
const Room = require('../models/room')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Floor {
    name: String,
    description: String
  }

  type Room {
    code: Int,
    name: String,
    description: String,
    capacity: Int,
    floor: Floor
  }

  type Query {
    room: String
  }
`)

const root = {
  room: () => {
    return "Hello"
    // return Room.find({}, 'code name description capacity floor', (error, rooms) => {
    //   if (error) console.error(error)
  
    //   return rooms
    // }).populate('floor').sort({_id: -1})
  }
}

// router.get('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true
// }))

router.get('/', (request, response) => {
  Room.find({}, 'code name description capacity floor', (error, rooms) => {
    if (error) console.error(error)

    response.send(rooms)
  }).populate('floor').sort({_id: -1})
})

router.post('/', (request, response) => {
  const title = request.body.title
  const description = request.body.description
  const location = request.body.location
  const capacity = request.body.capacity
  const newRoom = new Room({
    title: title,
    description: description,
    location: location,
    capacity: capacity
  })

  newRoom.save((error) => {
    if (error) console.log(error)

    response.send({
      success: true,
      message: 'Room saved successfully!'
    })
  })
})

module.exports = router
