const userModel=require("../models/usermodel")
const jwt=require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")


const authentication=async function(req,res,next){
try{    let token=req.headers["authorization"]

    if(!token){
        return res.status(400).send({status:false,msg:"token is not present"})
    }
    token=token.split(" ") 
    jwt.verify(token[1],"productManagementKey",(error,decodedToken)=>{
      if(error) {
         const msg=error.message==="jwt expired"?"JWT is expired": "Invalid JWT"
        return res.status(401).send({status:false,msg:msg})
      }
      req.decodedToken = decodedToken
      next()
    })
  }
  catch(error){
    return res.status(500).send({status:false,msg:error.message})
  }
}

 
const authorization=async function(req,res,next){
  try{
    const userId=req.params.userId
    const decodedToken=req.decodedToken
    if(!userId){
     
      return res.status(400).send({status:false,msg:"please provide user ID"})  
    }
    if(!isValidObjectId(userId)){
     
      return res.status(400).send({status:false,msg:"user id is not valid"}) 
    }

    const user=await userModel.findById(userId)

    if(!user){
     return res.status(404).send({status:false,msg:"user does not exist"})
    }
    
    if(decodedToken.userId!==userId){
      
      return res.status(403).send({status:false,msg:" not authorized user"})
    }
    next()
  }
  catch(error){
    return res.status(500).send({status:false,msg:error.message})
  }
}

module.exports={
  authentication,authorization
}