const express=require("express")
const router=express.Router();


const { createCustomer, getCustomer, DeleteCustomer }=require("../controller/customerController")




router.get("/getCostomer",getCustomer)
router.post("/createCustomer",createCustomer)
router.delete("/DeleteCustomer",DeleteCustomer)





module.exports=router