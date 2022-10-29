const express = require('express');
const router = express.Router();
const newauthormodel=require('../models/newauthormodel.js')
const newbookmodel=require('../models/newbookmodel.js')
const newpublishermodel=require('../models/newpublishermodel.js')
const bookcontroller=require('../controllers/bookController.js')
router.post("/createbook", bookcontroller.createBook)
router.get("/getbook", bookcontroller.getBooksData )
router.get("/getDetails", bookcontroller.getDetails )
router.get("/putNewBook", bookcontroller.putNewBook )
router.get("/updateRating", bookcontroller.updateRating )
module.exports=router;