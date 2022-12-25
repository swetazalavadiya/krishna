const express=require("express")
const router=express.Router();

const { createCustomer, getCustomer, DeleteCustomer  }=require("../controller/customerController")

const { createCard , getAllCart }=require("../controller/cardController")

router.post("/createCustomer", createCustomer)
router.get("/getCostomer/:customerID", getCustomer)
router.delete("/DeleteCustomer/:customerID", DeleteCustomer)

router.post("/createCard/:customerID",createCard)
router.get("/get",getAllCart)

module.exports=router