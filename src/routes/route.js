const express = require('express');

const router = express.Router();

const commonMW = require ("../middlewares/commonMiddlewares")

const orderController=require("../controllers/orderController")

router.get("/test-me", function (req, res) {

    res.send("My first ever api!")
})
router.post("/createNewUser",commonMW.myOrderMiddleware,orderController.createNewUser)

router.post("/createNewProduct", orderController.createNewProduct)

router.post("/createNewOrder",commonMW.myOrderMiddleware,orderController.createNewOrder)

router.get("/getNewOrder",orderController.getNewOrder) 

module.exports = router;