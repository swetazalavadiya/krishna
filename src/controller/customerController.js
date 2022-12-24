const constomerModel=require("../models/customerModel")
const { v4: uuidv4 } = require('uuid');
const {validate : uuidValidate } =require('uuid');
const { version : uuidVersion }  = require('uuid');
 const { isValidName, isValidMobile,  isValidDob, isValidEmail, validUUID } = require("../validatare");
const { findOne } = require("../models/customerModel");

function uuidValidateV4(uuid) {
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
  }

exports.createCustomer =async(req,res)=>{
try{ 
const {firstName,lastName,mobileNumber,DOB,emailID,address}= req.body

if(!firstName) return res.status(400).send({status:false,msg:"firstName is not present"})
if(!isValidName(firstName)) return res.status(400).send({status:false,msg:"firstName is not valid"})
if(!lastName) return res.status(400).send({status:false,msg:"lastName is not present"})
if(!isValidName(lastName)) return res.status(400).send({status:false,msg:"lastName is not valid"})
if(!mobileNumber) return res.status(400).send({status:false,msg:"mobileNumber is not present"})
if(!isValidMobile(mobileNumber)) return res.status(400).send({status:false,msg:" mobileNumber is not valid"})
let mobileUnique = await constomerModel.findOne({mobileNumber})
if(mobileUnique) return res.status(500).send({status : false ,msg : "please provide unique mobile number"})
if(!DOB) return res.status(400).send({status:false,msg:"DOB is not present"})
if(!isValidDob(DOB)) return res.status(400).send({status:false,msg:"DOB is not valid"})
if(!emailID) return res.status(400).send({status:false,msg:"emailId is not present"})
if(!isValidEmail(emailID)) return res.status(400).send({status:false,msg:"emailId is not valid"})
let emailUnique = await constomerModel.findOne({emailID})
if(emailUnique) return res.status(500).send({status : false ,msg : "please provide unique email number"})
if(!address) return res.status(400).send({status:false,msg:"address is not present"})


req.body.customerID=uuidv4()

const createCustomer1= await constomerModel.create(req.body)

return res.status(201).send({status:true,msg:"customer is created",data:createCustomer1})
}
catch(err){
    return res.status(500).send({status:false,msg:err.message })
}
}



exports.getCustomer=async(req,res)=>{
    
    try{
     let customerID = req.params.customerID
     if(!customerID)return res.status(500).send({status : false ,message : "please provide customer Id"})
     if(!validUUID(customerID)) return res.status(400).send({staus : false , msg : "invalid customer Id "})

    const getCustomer= await constomerModel.find({status:'ACTIVE', customerID : customerID})
    if(getCustomer.length==0) return res.status(404).send({status:false ,msg :"costomer is not present"})
    return res.status(200).send({status:true,data:getCustomer})    
    }
    catch(err)
    {
        return res.status(500).send({status : false , msg : err.message })
    }
 }
  



exports.DeleteCustomer = async (req,res)=>{
     try {
      let customerID=req.params.customerID
      if(!customerID)return res.status(500).send({status : false ,message : "please provide customer Id"})
      if(!validUUID(customerID))  return res.status(400).send({status:false,msg:"uuid is not valid"})


      const data= await constomerModel.findOneAndUpdate({customerID:customerID, status : 'ACTIVE'},{ status:'INACTIVE'},{new:true})
      if(!data) return res.status(404).send({status:false,msg:"costumer data is not found & data aleady deleted"})

      return res.status(200).send({status:true,msg:"customer data is deleted" , data : data})

     }
    catch(err){
    return res.status(500).send({status:true,msg:err.message})

    }
}