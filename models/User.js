const mongoose = require('mongoose')

/* 
Schema 
*/
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    match: [/^\S+@\S+$/g, 'invalid email format'],
    min: 4,
    max: 128
  },
  passwordHash: {
    type: String,
    required: [true, 'password is required'],
    min: 8,
    max: 512
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  }
})

/* 
Model
 */
const User = mongoose.model('User', userSchema)

module.exports = User