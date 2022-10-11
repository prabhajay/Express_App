const mongoose= require('mongoose')

module.exports = ()=>{
const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = process.env


const uri=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.wonm0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(uri).catch(error=>console.error(error))

 mongoose.connection.once('open',()=>{
    console.log('Mongoose is connected')
})
}