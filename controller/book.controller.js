const bookModel=require('../models/Book.model')
const { isVaildBook,validateBookPatch } = require('../utils')
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
      const { error, value } = isVaildBook(book)
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
  const updateBook=async(req,res)=>{
    try{
    const book=req.body
    const {id}=req.params
    //const index = books.findIndex(bk=>bk.id == id)
    //if(index === -1){
      //  res.status(404).send(`Book with id ${id} NOT FOUND`)
        //return
    //}
    const { error, value } = validateBookPatch(book)
    if(!error)
    {
        const updateBook=await bookModel.updateOne({_id:id},value)
        res.send(updateBook)
            return
        }
            res.status(422).send(error?.details[0]?.message)
    }
    catch(e){
        res.status(500).send(e.message)
    }
    }
    
module.exports={
    getBooks,
    createBook,
    updateBook

}