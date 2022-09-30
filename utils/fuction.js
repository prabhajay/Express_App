const uuid=require('uuid')
const joi=require('joi')
const saveBook = (book, books)=>{
    const id = uuid.v4()
    book.id = id; 
    books.push(book)
    return book
}

const isVaildBook= book=>{
    const schema=joi.object({
        author:joi.string().min(3).max(512).required(),
        title:joi.string().min(3).max(512).required(),
        inStock:joi.boolean().required(),
        section:joi.string().valid('computers','self-development','fictions')
    })
    const {error,value} = schema.validate(book)
    return { error, value}
}
module.exports = {saveBook,isVaildBook}