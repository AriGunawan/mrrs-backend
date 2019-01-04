const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  title: String,
  description: String,
  location: String,
  capacity: Number
})

const Room = mongoose.model('Room', RoomSchema)
module.exports = Room