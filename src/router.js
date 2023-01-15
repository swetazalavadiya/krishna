const express = require('express')
const router = express.Router();
const { Question} = require('./Controller/questionController')
const {createAdmin, adminLogin} = require('./Controller/adminController')
const { authentication} = require('./middle/auth')
router.post('/createQuestion', Question )
router.post('/createAdmin',createAdmin )
router.post('/adminlogin', adminLogin)
router.get('/getData', authentication , )


module.exports = router