const { isValidName, forName, isValidEmail, isValidNumber, isValidPassword, isValidObjectId, isValidPincode }= require('../validator/validation.js')
const userModel= require('../models/usermodel.js')
const bcrypt= require('bcrypt')


const registerUser = async function(req, res){
    try{
    
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
    if(!isValidName(req.body.password|| !isValidPassword(req.body.password))){return res.status(400).send({status:false, message:"password is not valid"})}
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
    catch(err){res.status(500).send({status:false, message:"Internal Server Error"})}}


//............................................................ SIGNIN API ..............................................................................

const userLogIn = async function (req, res) {
    try {
        // validation and requirements
        if (Object.keys(req.body)== 0) {return res.status(400).send({ status: false, message: "email and password are required for Log in" })}
        if (!req.body.email) { return res.status(400).send({ status: false, message: "email is mandatory" }) }
        if (!req.body.password) { return res.status(400).send({ status: false, message: "password is mandatory" }) }
        if (req.body.email.length == 0 || req.body.password.length == 0) {return res.status(400).send({ status: false, message: "both fields are required." })}
        if (!isValidEmail(req.body.email)) {return res.status(400).send({ status: false, message: "email is not valid" })}

        // user is not registered
        const userDetail = await userModel.findOne({ email:req.body.email, password: req.body.password })
        if (!userDetail) {return res.status(404).send({ status: false, message: "User not found with this EmailId and Password" })}
        
        // creating Token by Jwt.sign Function
        return res.status(200).send({ status: true, message: "user loggedin successfully", data:{userId:userDetail._id, token :jwt.sign({id: userDetail._id.toString(),}, "project/productManagementGroup8", { expiresIn: '30m' })}})}
        catch (error) { return res.status(500).send({ status: false, message: error.message })}}


//............................................................ GET API ..............................................................................



    const getUserParam =async function(req,res){
        try{
            const userId = req.params.userId
            if(!isValidObjectId(userId)) return res.status(400).send({status:false,message:"Enter a valid userId"})
            if(!req["decodedToken"]._id == userId) return res.status(401).send({staus:false,message:"Not Authorized"})
    
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
            return res.status(500).send({ status: false, error: error.message })
        }
    }


module.exports.getUserParam= getUserParam
module.exports.registerUser= registerUser
module.exports.userLogIn=userLogIn



















