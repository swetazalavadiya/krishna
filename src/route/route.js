const express= require('express')
const router = express.Router();
const collegeController=require("../controller/collegeController")
const internController=require("../controller/internController");
const collegeModel = require('../Model/collegeModel');

router.get('/test', function (req, res){
    console.log("hi I'm sweta")
    res.status(201).send({message:"welcome"})
})

router.post('/functionup/colleges', collegeController.createCollegeData) 
router.post('/functionup/interns', internController.newData) 
router.get('/functionup/collegeDetails', collegeController.getDetails) 

router.all("/*", function (req, res) {
    res.status(404).send({ status: false, msg: "make sure your endpont is correct" })
})

module.exports = router;
