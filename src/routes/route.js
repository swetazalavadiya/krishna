const express = require('express');
const router = express.Router();
const validateToken=require("../middleware/auth")
const userController= require("../controllers/userController")
router.post("/createusers", userController.createUser  )
router.post("/login", userController.loginUser)
router.get("/getusers/:userId", validateToken.validateToken, userController.getUserData)
router.put("/updateusers/:userId",validateToken.validateToken, userController.updateUser)
router.delete("/deleteusers/:userId",validateToken.validateToken,userController.deletedData)
module.exports = router;