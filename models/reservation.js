const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
  eventName: String,
  name: String,
  startDateTime: Date,
  endDateTime: Date,
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Floor'
  },
  floorName: String
})

const Reservation = mongoose.model('Reservation', ReservationSchema)
module.exports = Reservation