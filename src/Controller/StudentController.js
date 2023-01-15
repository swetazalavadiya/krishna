const questionModel= require("../Models/questionModel")
const student=require("../Models/studentModel")
const jwt=require("jsonwebtoken")


exports.createStudent=async(req,res)=>{

    try {
        let data=req.body
    let {name,rollNumber}=data

if(!name) return res.status(400).send({msg:"name is not present"})
if(!rollNumber) return res.status(400).send({msg:rollNumber})

const createData= await student.create(data)

return  res.status(201).send({status:true,msg:createData})
}
catch(err){
    return res.status(500).send({status:false,msg:err.message})
}
}



exports.studentLogin=async(req,res)=>{

    let data=req.body

    let {name,rollNumber}=data

    if(!name) return res.status(400).send({msg:"name is not present"})
    if(!rollNumber) return res.status(400).send({msg:rollNumber})
    
    const existStudent= await student.findOne({name:name,rollNumber:rollNumber})
    if(!existStudent) return res.status(404).send({status:false,msg:"student is not present"})

    const payload={
        student:existStudent.name,
        rollNumber:existStudent.rollNumber
    }

const token= await jwt.sign(payload,"keys")

return res.status(200).send({msg:token})
    
}




exports.studentGetQue=async(req,res)=>{
    const data=req.params.queId
    if(!data) return res.status(400).send({status:false,msg:"queId is not present"})
    const getQue= await questionModel.findOne({_id:data})
    if(!getQue) return res.status(404).send({status:false,msg:"que is not present"})

    return res.status(200).send({status:true,msg:getQue})
}

