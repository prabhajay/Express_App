const bookModel = require('../models/Book.model')
const { isValidBook, validateBookPatch } = require('../utils')

const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find().exec()
    res.send(books)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const createBook = async (req, res) => {
  try {
    const book = req.body
    const { error, value } = isValidBook(book)
    if (!error) {
     // value.createdBy = req.loggedInUser._id
      const newBook = await bookModel.create(value)
      res.send(newBook)
      return
    }
    res.status(422).send(error?.details[0]?.message)
  }catch (e) {
    res.status(500).send(e.message)
  }
}

const updateBook = async (req, res) => {
  try {
    const book = req.body
    const { id } = req.params
    const fullBookInfo = await bookModel.findById(id).exec()
    if (
      req.loggedInUser._id.toString() !== fullBookInfo?.createdBy?.toString()
    ) {
      res.status(401).send('you do not have access to edit this book')
      return
    }
    // @ts-ignore
    const { error, value } = validateBookPatch(book)
    if (!error) {
      await Book.updateOne({ _id: id }, value)
      const updatedBook = await bookModel.find({ _id: id }).exec()
      res.send(updatedBook)
      return
    }
    res.status(422).send(error?.details[0]?.message)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params
    const fullBookInfo = await bookModel.findById(id).exec()
    if (
      req.loggedInUser._id.toString() !== fullBookInfo?.createdBy?.toString()
    ) {
      res.status(401).send('you do not have access to edit this book')
      return
    }
    const book = await Book.find({ _id: id })
    await Book.deleteOne({ _id: id })
    res.send(book)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

const getBook = async (req, res) => {
  try {
    const { id } = req.params
    const book = await bookModel.findById(id).exec()
    res.send(book)
  } catch (e) {
    res.status(500).send(e.message)
  }
}

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getBook
}