const questionModel = require('../Models/questionModel')
const {uploadFile} = require('../aws')

exports.Question = async (req, res)=> {
    try{
        let data = req.body
        let Image = req.files
        let { question , I, II, III, IV ,rightAnswer } = data

        data.Image =  await uploadFile(Image[0])
        data.Video =  await uploadFile(Image[1])
        let ques = await  questionModel.create(data)
        return res.status(201).send({status : true, message :" successfully created question", data : ques})

    }catch(err){
        return res.status(500).send({message : err.message})
    }
}





