const jwt = require('jsonwebtoken')
const blogModels = require('../models/blogModels')

const authentication = async function (req, res, next) {
  try {
    let token = req.headers['x-auth-token']
    if (!token) return res.status(404).send({ msg: "this is  token requied" })
    let decodeedToken = jwt.verify(token, "function up porject")
    if (!decodeedToken) return res.status(404).send({ msg: "invalid token" })
    console.log(decodeedToken)
    req.data = decodeedToken.userId
    next()

  }
  catch (error) {
    res.status(500).send({ error: error.message, msg: "server error" })
  }
}
// =============== authorization
const authorization = async function (req, res, next) {
  try {
    
    let auth = req.data
    let id = req.params.blogid
    let blogData = await blogModels.findById({ _id: id })
    if (blogData.authorId != auth) return res.status(404).send({ msg: "valid id is require" })
    next()

  }
  catch (error) {
    res.status(500).send({ error: error.message, msg: "server error" })
  }
}

module.exports.authentication = authentication
module.exports.authorization = authorization


