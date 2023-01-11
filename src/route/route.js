const express = require("express");
const router = express.Router();
const studentcontroller = require("../controller/studentcontroller");
const validationmiddleware = require("../middleware/validationmware");
const { authentication, authorization } = require("../middleware/auth");

router.post("/registerStudent",validationmiddleware.studentvalidation,studentcontroller.registerStudent);

router.post("/login", validationmiddleware.loginvalidation, studentcontroller.login);

router.get("/getStudent",validationmiddleware.filtervalidation,studentcontroller.getStudent);

router.put("/updateStudent/:studentId",validationmiddleware.updatevalidation,authentication,authorization,studentcontroller.updateStudent);

router.delete("/deleteStudent/:studentId",authentication,authorization,studentcontroller.deleteStudent);

router.all("/*", function(req,res){
    res.status(404).send({status:false, message:"Path not found."})
})

module.exports = router;
