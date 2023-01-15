const adminModel = require('../Models/adminModel')
const {uploadFile} = require('../aws')
exports.Question = async (req, res)=> {
    try{
        let data = req.body
        let {Image, Video} = req.files
        let { question , I, II, III, IV ,rightAnswer } = data

        data.Image = uploadFile(Image[0])
        data.Video = uploadFile(Video[0])
        let ques = await  adminModel.create(data)
        return res.status(201).send({status : true, message :" successfully created question", data : ques})

    }catch(err){
        return res.status(500).send({message : err.message})
    }
}