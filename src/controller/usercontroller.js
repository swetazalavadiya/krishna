const { isValidName, forName, isValidEmail, isValidNumber, isValidPassword, isValidObjectId, isValidPincode }= require('../validator/validation.js')
const userModel= require('../models/usermodel.js')


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





















