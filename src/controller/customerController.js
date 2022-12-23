const constomerModel=require("../models/customerModel")
const { v4: uuidv4 } = require('uuid');
const {validate : uuidValidate } =require('uuid');
const { version : uuidVersion }  = require('uuid');
const { isValidName, isValidMobile,  isValidDob, isValidEmail} = require("../validatare")

function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }

exports.createCustomer =async(req,res)=>{
try{ 
const {firstName,lastName,mobileNumber,DOB,emailID,address}= req.body

if(!firstName) return res.status(400).send({status:false,msg:"firstName is not present"})
if(!lastName) return res.status(400).send({status:false,msg:"firstName is not present"})
if(!mobileNumber) return res.status(400).send({status:false,msg:"firstName is not present"})
if(!DOB) return res.status(400).send({status:false,msg:"firstName is not present"})
if(!emailID) return res.status(400).send({status:false,msg:"firstName is not present"})
if(!address) return res.status(400).send({status:false,msg:"firstName is not present"})

if(isValidName(firstName)) return res.status(400).send({status:false,msg:"firstName is not valid"})
if(isValidName(lastName)) return res.status(400).send({status:false,msg:"lastName is not valid"})
if(isValidDob(DOB)) return res.status(400).send({status:false,msg:"mobileNumber is not valid"})
if(isValidEmail(emailID)) return res.status(400).send({status:false,msg:"mobileNumber is not valid"})
if(isValidMobile(DOB)) return res.status(400).send({status:false,msg:"mobileNumber is not valid"})

req.body.customerID=uuidv4()

const createCustomer1= await constomerModel.create(req.body)

return res.status(201).send({status:true,msg:"customer is created",data:createCustomer1})
}
catch(err){
    return res.status(500).send({status:false,msg:err.message })
}
}



exports.getCustomer=async(req,res)=>{

    const getCustomer= await constomerModel.find({status:ACTIVE})
    if(getCustomer.length==0) return res.status(404).send({status:false ,msg :"costomer is not present"})
    return res.status(200).send({status:true,data:getCustomer})    
        }
  

exports.DeleteCustomer = async (req,res)=>{
try {
    let customerID=req.params.customerID

   if(!uuidValidateV4(customerID))  return res.status(400).send({status:false,msg:"uuid is not valid"})

const data= await constomerModel.findOneAndUpdate({customerID:customerID},{status:INACTIVE},{new:true})
if(!data) return res.status(404).send({status:false,msg:"costumer data is not found"})

return res.status(200).send({status:true,msg:"customer data is deleted"})

}
catch(err){
    return res.status(500).send({status:true,msg:err.message})

}
}