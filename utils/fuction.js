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
const updateBook=(book,books)=>{
    const index=books.indexOf(bk=>bk.id==book.id)
    if(index !== -1)
    {
        for(let key in books[index])
        {
            if (key)
            {
                books[index][key]=book[key]
            }
        }
   // books[index]= book
}
return null
}

module.exports = {saveBook:createBook,isVaildBook,validateBookPatch,updateBook}