require('dotenv').config()
const express=require('express')
const uuid=require('uuid')
const app=express()
const PORT=process.env.PORT
const {saveBook,isVaildBook,updateBook} = require('./utils/fuction')
const books=require('./data/books.json')
app.use(express.json());

/* GET endpoint or routes or resource */

app.get('/',(req, res)=>{
    res.send('welcome my page')
})

app.get('/api/v1/books',(req, res)=>{
    res.send(books)
})

app.patch('/api/v1/books/:id',(req,res)=>{
    const book=req.body
    const index = books.indexOf(bk=>bk.id == book.id)
    if(index === -1){
        res.status(404).send(`Book with id ${book?.id} NOT FOUND`)
        return
    }
    const { error, value } = validateBookPatch(book)
    if(!error)
    {
        const updateBook=updateBook(value,books)
            res.send(updateBook)
            return
        }
            res.status(422).send(error?.details[0]?.message)
    })

app.post('/api/v1/books',(req,res)=>{
    const book=req.body
    const { error, value } = isVaildBook(book)
    if(value && !error)
    {
        const newBook=saveBook(value,books)
        res.send(newBook)
        return
    }
   // const errors= error?.details.map(err=>err.message)
    res.status(422).send(error?.details[0]?.message)
   // console.log(book)
   //isVaildBook(book)
   //res.send(book)
})
app.get('/api/v1/books/:id',(req, res)=>{
    //const indexOf = (books,func)=>{
      //  for (let i=0;i<books.length;i++)
        //{
          //  if(func(books[i]))
            //return i
       // }
        //return -1
    //}
    const {id}=req.params;
    const func=book=>book.id==id;
    const book = books.find(book=>book.id == id)
    //const id=req.parms.id;
    //const filteredBooks=books.filter(book=>book.id == id)
    //if(filteredBooks.length !==0) res.send(filteredBooks[0])
    //if(filteredBooks.length ===0) res.send(`NOT Matching books for id ${id}`)

    //OR
    if(!book){
   res.status(404).send(`NOT Matching books for id ${id}`)
return
   }
   res.send(book)

})


//example
app.get('/about',(req, res)=>{
    res.send('<h1>about</h1>')
})
//Catch all resource
app.get('*',(req,res)=>{
    res.status(404).send('<p style="color:red;font-size:22px">Not found</p>')
})

//start the server 
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})