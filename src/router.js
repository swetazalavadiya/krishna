const express = require('express')
const router = express.Router();
const { Question} = require('./Controller/questionController')
const {createAdmin, getque,editQue,adminLogin} = require('./Controller/adminController')
const {studentGetQue}=require("./Controller/questionController")
const { authentication,studentauthentication} = require('./middle/auth')
router.post('/createQuestion', Question )
router.post('/createAdmin',createAdmin )
router.post('/adminlogin', adminLogin)
router.get('/getData', authentication , getque)
router.put("/editQue/:queId",authentication,editQue)
router.post("/studentLogin",studentLogin)
router.get("/studentGetQue/:queId",studentauthentication,studentGetQue)

module.exports = router