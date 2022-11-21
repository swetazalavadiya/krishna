const collegeModel = require('../Model/collegeModel')
const internModel = require('../Model/internModel')
const validation = require('../validation/validation')

const createCollegeData = async function (req, res) {
    try {
        let data = req.body
        let { name, fullName, logoLink } = data

        if (!name) return res.status(400).send({ status: false, message: "name required" })
        if (!validation.Name(data.name)) return res.status(400).send({ status: false, message: "invalid Name" })
        let checkDuplicate = await collegeModel.findOne({ name: data.name })
        if (checkDuplicate) { return res.status(400).send({ status: false, msg: "name is already exist."}) }

        if (!fullName) return res.status(400).send({ status: false, message: "fullName required" })
        if (!validation.fullName(data.fullName)) return res.status(400).send({ status: false, message: "invalid fullName" })
        
        if (!logoLink) return res.status(400).send({ status: false, message: "logoLink required" })
        if (!validation.logoLink(data.logoLink)) return res.status(400).send({ status: false, message: "invalid logoLink" })

        let createData = await collegeModel.create(data)
        res.status(201).send({ status: true, data: createData })

    } catch (error) {
        res.status(500).send({ status: false, message: error.message, message: " server error" })
    }
}

const getDetails= async function(req,res){
    let collegeName = req.query.collegeName
    let filtercollege= await collegeModel.findOne({name:collegeName})

    let collegefullname=filtercollege.fullName
    let collegelogo=filtercollege.logoLink
    let collegeId=filtercollege._id

    let filterintern= await internModel.find({collegeId:collegeId}).select({_id:1, name:1, email:1, mobile:1})
    res.status(200).send({status:true, data:{name:collegeName, fullname:collegefullname, logoLink:collegelogo, interns:filterintern}})

}
module.exports.createCollegeData=createCollegeData
module.exports.getDetails=getDetails