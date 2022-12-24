const express=require("express")
const router=express.Router();


const { createCustomer, getCustomer, DeleteCustomer }=require("../controller/customerController")




router.post("/createCustomer", createCustomer)
router.get("/getCostomer/:customerID", getCustomer)
router.delete("/DeleteCustomer/:customerID", DeleteCustomer)





module.exports=router