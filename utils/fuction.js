const uuid=require('uuid')
const joi=require('joi')
const createBook = (book, books)=>{
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

const validateBookPatch= book=>{
    const schema=joi.object({
        author:joi.string().min(3).max(512),
        title:joi.string().min(3).max(512),
        inStock:joi.boolean(),
        section:joi.string().valid('computers','self-development','fictions')
    }) 
    const {error,value}=schema.validate(book)
    return { error ,value}
}
const updateBook=(book,books,index)=>{
    //const index=books.indexOf(bk=>bk.id==book.id)
    //if(index !== -1)
    //{
        for(let key in books[index])
        {
            if (book[key])
            {
                books[index][key]=book[key]
            }
        }
   return books[index]
}
//return null
//}

module.exports = {
    createBook,
    isVaildBook,
    validateBookPatch,
    updateBook}