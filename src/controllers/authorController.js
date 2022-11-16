const authorModel= require('../models/authorModel.js')
const emailValidator=require('email-validator')

const createAuthor= async function (req, res){
    try{
    let data= req.body
    if(!emailValidator.validate(data.email)){
        return res.status(404).send("invalid email")
    }
    let createData= await authorModel.create(data)
    res.status(201).send ({data:createData})
}
catch(error){
    res.status(500).send({message:error.message})
}
}
module.exports.createAuthor=createAuthor