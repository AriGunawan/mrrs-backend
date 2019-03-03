const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  code: String,
  name: String,
  description: String,
  capacity: Number,
  floor: String
  // floor: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Floor'
  // }
})

const Room = mongoose.model('Room', RoomSchema)
module.exports = Room