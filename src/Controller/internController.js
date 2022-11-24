const internModel =require('../Model/internModel')
const collegeModel = require('../Model/collegeModel')
const validation = require('../validation/validation')

let newData= async function(req,res){
    try{
        let data = req.body
        let { Name, email, mobile, collegeId } = data
        if (!Name) return res.status(400).send({ status: false, message: "name required" })
        if (!validation.name(data.Name)) return res.status(400).send({ status: false, message: "invalid Name" })

        if (!email) return res.status(400).send({ status: false, message: "email required" })
        if (!validation.email(data.email)) return res.status(400).send({ status: false, message: "invalid email" })
        let checkDuplicate = await internModel.findOne({ email: data.email })
        if (checkDuplicate)return res.status(400).send({ status: false, msg: "email is already exist."})

        if (!mobile) return res.status(400).send({ status: false, message: "mobile required" })
        if (!validation.mobile(data.mobile)) return res.status(400).send({ status: false, message: "invalid mobile" })
        let checkDuplicate2 = await internModel.findOne({ mobile: data.mobile })
        if (checkDuplicate2)return res.status(400).send({ status: false, msg: "mobile number is already exist."})

        let college = await collegeModel.findOne({ name: collegeName })
        if (!college) {
            return res.status(404).send({ status: false, message: 'This college does not exists' })
        }
        collegeId = college._id
        let finalData = {Name, email, mobile, collegeId}
        let interns = await internModel.create(finalData)
        return res.status(201).send({ status: true, data: interns })

    }catch(error){
        res.status(500).send({ status: false, message: error.message, message: " server error" })
    }
}

module.exports.newData=newData