const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  code: Number,
  name: String,
  description: String,
  capacity: Number,
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor'
  },
  floorName: String
})

const Room = mongoose.model('Room', RoomSchema)
module.exports = Room