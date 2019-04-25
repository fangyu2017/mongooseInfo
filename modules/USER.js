const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  passworld: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
  }, 
  time: {
    type: Date,
    default: Date.now
  }
}) 
const User = mongoose.model('users', UerSchema)
module.exports = User