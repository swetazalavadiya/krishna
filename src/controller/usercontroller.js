const { isValidName, forName, isValidEmail, isValidNumber, isValidPassword, isValidObjectId, isValidPincode }=require('../validator/validation.js')
const {sign} = require("jsonwebtoken")
const userModel= require('../models/usermodel.js')


const logIn=async function(req,res){
try{    const data=req.body
    const {email,password}=data
    
    if(!email){
        return res.status(400).send({status:false,msg:"please provide email"})
    }

    if(!isValidEmail(email)){
        return res.status(400).send({status:false,msg:"please provide valid email"})  
    }

    if(!password){
        return res.status(400).send({status:false,msg:"please provide password"})  
    }

    if(!isValidPassword(password)){
        return res.status(400).send({status:false,msg:"please provide valid password"})     
    }

    const user=await userModel.findOne({email:email,password:password})

    if(!user){
        return res.status(404).send({status:false,msg:"no user found"})
    }
const userId=user._id.toString()
    const token=sign(
        {
            userId:userId
        }, "productManagementKey",
        {
            expiresIn:"1h"
        }
    )

    return res.status(200).send({status:true,msg:"user log in successfully",data:{userId:userId,token:token}})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}

module.exports ={
    logIn
}





















