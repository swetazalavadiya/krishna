const express=require("express")
const router=express.Router();


const { createCustomer, getCustomer, DeleteCustomer }=require("../controller/customerController")

const {createCard,get}=require("../controller/cardController")


router.post("/createCustomer", createCustomer)
router.get("/getCostomer/:customerID", getCustomer)
router.delete("/DeleteCustomer/:customerID", DeleteCustomer)


router.get("/get",get)
router.post("/createCard/:customerID",createCard)



module.exports=router