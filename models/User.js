const mongoose=require('mongoose')

//Create schema
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        requied:[true,'email is required'],
        unique:true,
        match:[/^\$+@\S+$/g, 'Invaild mail format'],
        min:4,
        max:100
    },
    passwordHash:{
        type:String,
        requied:[true,'password is required'],
        min:8,
        max:512
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

//Model

const User= mongoose.model('User',userSchema)

module.exports= User