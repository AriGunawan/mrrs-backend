const express = require('express')
const router = express.Router()
const Room = require('../models/room')

router.get('/', (request, response) => {
  Room.find({}, 'title description location capacity', (error, posts) => {
    if (error) console.error(error)

    response.send(posts)
  }).sort({_id: -1})
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
