const express = require('express')
const router = express.Router();
const { Question} = require('./Controller/AdminController')

router.post('/createQuestion', Question )

module.exports = router