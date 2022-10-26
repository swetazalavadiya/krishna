const express = require('express');
const router = express.Router();
//const UserModel= require("../models/userModel.js")
//const UserController= require("../controllers/userController")
const bookmodel=require('../models/bookmodel')

//router.get("/test-me", function (req, res) {
   // res.send("My first ever api!")
//})

router.post("/createbook",async(req,res)=>{
    let data=req.body;
    let saveData=await bookmodel.create(data)
    res.send({print: saveData})
})
router.get("/getbook",async (req,res)=>{
    let book=await bookModel.find()
    res.send({print:book})
})
//router.post("/createUser", UserController.createUser  )

//router.get("/getUsersData", UserController.getUsersData)

module.exports = router;
