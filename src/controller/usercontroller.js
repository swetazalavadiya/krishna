const { isValidName, forName, isValidEmail, isValidNumber, isValidPassword, isValidObjectId, isValidPincode }= require('../validator/validation.js')
const userModel= require('../models/usermodel.js')




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
    if(!isValidName(req.body.address.billing.street)){return res.status(400).send({status:false, message:"street is not valid"})}
    if(!isValidName(req.body.address.billing.city)){return res.status(400).send({status:false, message:"city is not valid"})}
    if(!isValidPincode(req.body.address.billing.pincode)){return res.status(400).send({status:false, message:"pincode is not valid"})}
   
    //validation ends


    // checking uniqueness
    if(await userModel.findOne({email:req.body.email, phone:req.body.phone})){return res.status(409).send({status:false, message:"this user is already exist"})}
    
    // encrypting the password
    req.body.password=await bcrypt.hash(req.body.password,1 )


    

    // storing document
    res.status(201).send({status:true, message: "User created successfully", data:await userModel.create(req.body)})}
    catch(err){
    res.status(500).send({status:false, message:"Internal Server Error"})}}



module.exports.registerUser= registerUser


















