const blogModel = require('../models/blogModels.js')
const authorModel = require('../models/authorModel.js')
const validation = require('../validator/validator')
const moment = require('moment')

const createBlog = async function (req, res) {
  try {

    let data = req.body
    let {title, body, authorId, tags, category, subcategory}=data

      if(!title)return res.status(400).send ({status:false, message:"title required"})
      if(!body)return res.status(400).send ({status:false, message:"body required"})
      if(!authorId)return res.status(400).send ({status:false, message:"authorId required"})
      if(!tags)return res.status(400).send ({status:false, message:"tags required"})
      if(!category)return res.status(400).send ({status:false, message:"category required"})
      if(!subcategory)return res.status(400).send ({status:false, message:"subcategory required"})

    if (!validation.title(data.title)) return res.status(400).send({ status: false, message: "invalid title" })
    if (!validation.body(data.body)) return res.status(400).send({ status: false, message: "invalid body" })
    if (!validation.authorId(data.authorId)) return res.status(400).send({ status: false, message: "invalid authorId" })
    if (!validation.category(data.category)) return res.status(400).send({ status: false, message: "invalid category" })

    let check = await authorModel.findById({ _id: data.authorId })
    if (!check) return res.status(404).send({ message: "this is not valid id" })
    let createData = await blogModel.create(data)
    res.status(201).send({ status: true, data: createData })

  } catch (error) {
    res.status(500).send({ status: false, error: error.massage, message: "server error" })
  }
}

const getblogData = async function (req, res) {
  try {
    let data = req.query
    data.isDeleted = false
    data.isPublished = true
    let getdata = await blogModel.find(data)
    res.status(200).send({ status: true, msg: getdata })
  } catch (error) {
    res.status(500).send({ status: false, error: error.message, message: " server error" })
  }
}

const update = async function (req, res) {
  try {
    let { title, body, tags, subcategory } = req.body
    let id = req.params.blogid
    if (!id) {
      return res.status(400).send({ status: false, message: "please enter blog id in params" })
    }
    let validId = await blogModel.findById(id)
    if (!validId) {
      return res.status(404).send({ status: false, message: "required validId" })
    }
    let update = await blogModel.findOneAndUpdate(
      { _id: id },
      ({
        $set: { title: title, body: body, isPublished: true, publishedAt: moment().format("YYYY MM DD") },
        $push: { tags: tags, subcategory: subcategory }
      }),
      { new: true })

    if (!update) return res.status(404).send({ message: "this is wrong id" })
    res.status(200).send({ status: true, msg: update})

  } catch (error) {
    res.status(500).send({ status: false, error: error.message, message: "server error" })
  }

}

const blogsDeleted = async function (req, res) {
  try {
    let id = req.params.blogid
    if (!id) {
      return res.status(400).send({ status: false, message: "please enter blogId" })
    }
    let validId = await blogModel.findById(id)
    if (!validId) {
      return res.status(404).send({ status: true, message: "required validId" })
    }
    let result = await blogModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: moment().format("YYYY MM DD") } },
      { new: true })

    if (!result) return res.status(404).send({ message: "this is not match id" })
    res.status(200).send({ status: true, data: result })

  } catch (error) {
    res.status(500).send({ status: false, error: error.message, message: "server error" })
  }
}

const blogsdetails = async function (req, res) {
  try {
    let data = req.query
    let changedelete = await blogModel.updateMany(data, { $set: { isDeleted: true } }, { new: true })

    if (!changedelete) return res.status(404).send({ message: "this is delete key" })
    res.status(200).send({ status: true, message: changedelete })
  }
  catch (error) {
    res.status(500).send({ status: false, error: error.message, message: " server error" })
  }
}


module.exports.createBlog = createBlog
module.exports.getblogData = getblogData
module.exports.update = update
module.exports.blogsDeleted = blogsDeleted
module.exports.blogsdetails = blogsdetails
