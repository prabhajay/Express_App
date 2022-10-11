const userModel=require('../models/User')
const login=(req,res)=>{
    const{email,password}=req.body
    const user=userModel.find().exec()
}