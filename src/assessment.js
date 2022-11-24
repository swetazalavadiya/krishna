const collegeModel= require('../Model/collegeModel')
const internModel=require('../Model/internMOodel')
const validation= require('../validation/validation')

let getData= async function(req,res){
    try{
        let collegeName=req.query.collegeName

        let filter1=await collegeModel.findOne({name:collegeName})

        let fullname=filter1.fullname
        let logo=filter1.logoLink
        let collegeId=filter1._id

        let filter2= await internModel.find({collegeId:collegeId}).select({_id:1, name:1, email:1, mobile:1})
        res.status(200).send({status:true, data:{name:collegeName,fullname:fullname, logoLink:logo, interns:filter2}})


    }catch(err){
        res.status(500).send({status:false, msg:err.message, message:"server error"})
    }
}
module.exports.getData=getData