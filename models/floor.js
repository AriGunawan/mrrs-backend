const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FloorSchema = new Schema({
  name: String,
  description: String
})

const Floor = mongoose.model('Floor', FloorSchema)
module.exports = Floor