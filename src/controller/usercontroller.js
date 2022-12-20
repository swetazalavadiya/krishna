const { isValidName, forName, isValidEmail, isValidNumber, isValidPassword, isValidObjectId, isValidPincode }=require('../validator/validation.js')
const {sign} = require("jsonwebtoken")
const userModel= require('../models/usermodel.js')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const aws= require("aws-sdk")

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
  })
  
  let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    
    let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws
  
    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",
        Key: "abc/" + file.originalname, 
        Body: file.buffer
    }
  
  
    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)
    })
  
    
  
   })
  }



const registerUser = async function(req, res){
    // try{
        let files= req.files
        if(files && files.length>0){
            let uploadedFileURL= await uploadFile( files[0] )
            console.log(uploadedFileURL)
            req.body.profileImage=uploadedFileURL
        }
        else{
            res.status(400).send({ msg: "No file found" })
        }

       
    
        // checking requirements
        if(Object.keys(req.body).length==0){return res.status(400).send({status:false, message:"body is important"})}

        if(!req.body.fname){ return res.status(400).send({status:false, message:"fname is mandatory"})}

        if(!req.body.lname){return res.status(400).send({status:false, message:"lname is mandatory"})}

        if(!req.body.email){return res.status(400).send({status:false, message:"email is mandatory"})}

        if(!req.body.profileImage){return res.status(400).send({status:false, message:"profileImage is mandatory"})}

        if(!req.body.phone){return res.status(400).send({status:false, message:"phone is mandatory"})}

        if(!req.body.password){return res.status(400).send({status:false, message:"password is mandatory"})}
        
        req.body.address=JSON.parse(req.body.address)
       
        if(!req.body.address.shipping.street){return res.status(400).send({status:false, message:"street is mandatory"})}

        if(!req.body.address.shipping.city){return res.status(400).send({status:false, message:"city is mandatory"})}

        if(!req.body.address.shipping.pincode){return res.status(400).send({status:false, message:"pincode is mandatory"})}

        if(!req.body.address.billing.street){return res.status(400).send({status:false, message:"street is mandatory"})}

        if(!req.body.address.billing.city){return res.status(400).send({status:false, message:"city is mandatory"})}

        if(!req.body.address.billing.pincode){return res.status(400).send({status:false, message:"pincode is mandatory"})}
    
    // validation starts
    if(!forName(req.body.fname) || !isValidName(req.body.fname)){return res.status(400).send({status:false, message:"fname is not valid"})}

    if(!forName(req.body.lname) || !isValidName(req.body.lname)){return res.status(400).send({status:false, message:"lname is not valid"})}

    if(!forName(req.body.fname) || !isValidName(req.body.fname)){return res.status(400).send({status:false, message:"fname is not valid"})}

    if(!isValidName(req.body.email|| !isValidEmail(req.body.email))){return res.status(400).send({status:false, message:"email is not valid"})}

    if(!isValidName(req.body.profileImage)){return res.status(400).send({status:false, message:"profileImage is not valid"})}

    if(!isValidName(req.body.phone|| !isValidNumber(req.body.phone))){return res.status(400).send({status:false, message:"phone no. is not valid"})}

    if(!isValidPassword(req.body.password)){return res.status(400).send({status:false, message:"password is not valid"})}

    if(!isValidName(req.body.address.shipping.street)){return res.status(400).send({status:false, message:"street is not valid"})}

    if(!isValidName(req.body.address.shipping.city)){return res.status(400).send({status:false, message:"city is not valid"})}

    if(!isValidPincode(req.body.address.shipping.pincode)){return res.status(400).send({status:false, message:"pincode is not valid"})}

    req.body.address.shipping.pincode=Number(req.body.address.shipping.pincode)

    if(!isValidName(req.body.address.billing.street)){return res.status(400).send({status:false, message:"street is not valid"})}

    if(!isValidName(req.body.address.billing.city)){return res.status(400).send({status:false, message:"city is not valid"})}

    if(!isValidPincode(req.body.address.billing.pincode)){return res.status(400).send({status:false, message:"pincode is not valid"})}

    req.body.address.billing.pincode=Number(req.body.address.billing.pincode)
    //validation ends
    //==========================================================
    
    // checking uniqueness
    if(await userModel.findOne({email:req.body.email, phone:req.body.phone})){return res.status(409).send({status:false, message:"this user is already exist"})}
    
    // encrypting the password
    req.body.password=await bcrypt.hash(req.body.password,1 )
    //==========================================================
    // storing document
    res.status(201).send({status:true, message: "User created successfully", data:await userModel.create(req.body)})}
    // catch(err){res.status(500).send({status:false, message:"Internal Server Error"})}}


//............................................................ SIGNIN API ..............................................................................

const logIn=async function(req,res){
    try{    const data=req.body
        const {email,password}=data
        if(Object.keys(data).length==0){return res.status(400).send({status:false, message:"body is important"})}

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
        
        const user=await userModel.findOne({email:email}).select({password:1})

        if(!user){
            return res.status(404).send({status:false,msg:"no user found"})
        }

        const matchedPassword=await bcrypt.compare(password,user.password)

        if(!matchedPassword){
            return res.status(400).send({status:false,msg:"user is not valid"})
        }
    
    const userId=user._id.toString()
        const token=sign(
            {
                userId:userId
            }, "productManagementKey",
            {
                expiresIn:"24h"
            }
        )
    
        return res.status(200).send({status:true,msg:"user log in successfully",data:{userId:userId,token:token}})
    }
    catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
    }
//............................................................ GET API ..............................................................................



    const getUserParam =async function(req,res){
        try{
            const userId = req.params.userId

            if(!isValidObjectId(userId)) return res.status(400).send({status:false,message:"Enter a valid userId"})
            // if(!req["decodedToken"]._id == userId) return res.status(401).send({staus:false,message:"Not Authorized"})
            
            const user = await userModel.findById(userId)

            let {fname,lname,email,profileImage,phone,password,address,_id} = user
            let data ={}
            data.address = address
            data._id = _id
            data.fname = fname
            data.lname = lname
            data.email = email
            data.profileImage = profileImage
            data.phone = phone
            data.password = password
    
            return res.status(200).send({status:true,message: "User profile details",data:data})
    
        }catch(err){
            return res.status(500).send({ status: false, error: err.message })
        }
    }

    module.exports ={
        registerUser, logIn,getUserParam
    }



















