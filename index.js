require('dotenv').config()
require('./db/index')()
const express=require('express')
const uuid=require('uuid')
const app=express()
const cors=require('cors')
const pug=require('pug')
const PORT=process.env.PORT

const books=require('./data/books.json')
const {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
    getBook
  } = require('./controller/book.controller')
app.use(cors())
app.use(express.json());
app.use(express.static('public'));
app.set('view engine','pug')
app.set('views','./views')
/* GET endpoint or routes or resource */

app.get('/',(req, res)=>{
    res.send('welcome my page')
})

app.get('/api/v1/books', getBooks)
//app.post('/api/v1/books', createBook)
//app.patch('/api/v1/books/:id',updateBook)


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

//app.post('/api/v1/books', createBook)
//(req,res)=>{
  //  const book=req.body
    //const { error, value } = isVaildBook(book)
    //if(value && !error)
    //{
      //  const newBook=saveBook(value,books)
        //res.send(newBook)
        //return
//}
   // const errors= error?.details.map(err=>err.message)
   // res.status(422).send(error?.details[0]?.message)
   // console.log(book)
   //isVaildBook(book)
   //res.send(book)
//})


app.delete('/api/v1/books/:id',(req,res)=>{
    //const book=req.body
    const {id}=req.params
    const index=books.findIndex(bk=>bk.id == id)
    if(index === -1)
    {
    res.status(404).send('NOT Found')
}
const deleteBook = books.splice(index,1)
res.send(deleteBook)
})


//example
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'Pug Demo',
        visitorNo:3,
        books:books,
        condition:true})
})
app.get('/contactus',(req, res)=>{
    res.render('contactus')
})
//Catch all resource
app.get('*',(req,res)=>{
    res.status(404).send('<p style="color:red;font-size:22px">Not found</p>')
})



//start the server 
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})

