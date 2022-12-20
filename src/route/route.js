const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")
const aws= require("aws-sdk")

const userController=require("../controller/usercontroller")

router.post("/login",userController.logIn)

module.exports=router

















//===============================router validation(For path is valid or Not)===================================================//


router.all("/*", async function (req, res) {
    return res.status(400).send({ status: false, message: "Bad reqeust / invalid Path" });
  });




module.exports=router;
