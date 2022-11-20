const authorModel = require('../models/authorModel.js')
const jwt = require('jsonwebtoken')
const validation=require('../validator/validator')

const createAuthor = async function (req, res) {
    try {
        let data = req.body
        let {fname, lname, title, email, password}=data
        if(!fname)return res.status(400).send ({status:false, message:"firstname required"})
        if(!lname)return res.status(400).send ({status:false, message:"lastname required"})
        if(!title)return res.status(400).send ({status:false, message:"title required"})
        if(!email)return res.status(400).send ({status:false, message:"email required"})
        if(!password)return res.status(400).send ({status:false, message:"password required"})
    
        if(!validation.isValidEmail(data.email)) return res.status(400).send({status:false,message:"invalid emailid"})
        if(!validation.isValidPassword(data.password)) return res.status(400).send({status:false,message:"invalid password"})
        if(!validation.firstName(data.fname)) return res.status(400).send({status:false,message:"invalid firstname"})
        if(!validation.lastName(data.lname)) return res.status(400).send({status:false,message:"invalid lastname"})

        let createData = await authorModel.create(data)
        res.status(201).send({ data: createData })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message, message: " server error"  })
    }
    
}

const login = async function (req, res, next) {
    try {
        let { password, email } = req.body
        if (password == undefined, email == undefined) return res.status(400).send({ message: "send password and email  value" })
        let data = await authorModel.findOne({ password: password, email: email })
        if (!data) return res.status(400).send({ message: "this is not match password and email" })
        
        let token = jwt.sign({userId: data._id.toString()},"sweta")
        res.setHeader('x-api-key', token)
        res.status(200).send({ data:"token",msg: token, message:"token is successfully generated" })
    }
    catch (error) {
        res.status(500).send({status: false, message: error.message, message: " server error"  })
    }
}

module.exports.login = login
module.exports.createAuthor = createAuthor