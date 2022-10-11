const mongoose = require('mongoose')

/* 
Schema 
*/
const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'author is required'],
    min: 3,
    max: 512
  },
  inStock: {
    type: Boolean,
    required: [true, 'inStock is required']
  },
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: true,
    min: 3,
    max: 512
  },
  section: {
    type: String,
    enum: {
      values: ['computer', 'self-development', 'fictions'],
      message: '{VALUE} is not a valid value for section'
    }
  },
  addedOnDate: {
    type: Date,
    default: Date.now
  },
  qty: {
    type: Number,
    default: 0
  },
})

//create models
const Book=mongoose.model('Book',bookSchema)

module.exports = Book
