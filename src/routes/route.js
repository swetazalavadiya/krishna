const express = require('express');
const router = express.Router();
const bookmodel=require('../models/bookmodel')
const bookcontroller=require('../controllers/bookcontroller')
router.post("/createbook", bookcontroller.createbook)
router.get("/getbook", bookcontroller.getbook )
module.exports=router;