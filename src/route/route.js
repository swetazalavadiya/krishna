const express = require("express");
const router = express.Router();
const studentcontroller = require("../controller/studentcontroller");
const validationmware = require("../middleware/validationmware");
const { authentication, authorization } = require("../middleware/auth");

router.post(
  "/registerStudent",
  validationmware.studentvalidation,
  studentcontroller.registerStudent
);


router.get(
  "/getStudent",
  validationmware.filtervalidation,
  studentcontroller.getStudent
);


router.post("/login", validationmware.loginvalidation, studentcontroller.login);
router.put(
  "/updateStudent/:studentId",
  validationmware.updatevalidation,
  authentication,
  authorization,
  studentcontroller.updateStudent
);


router.delete(
  "/deleteStudent/:studentId",
  authentication,
  authorization,
  studentcontroller.deleteStudent
);

router.all("/*", function(req,res){
    res.status(404).send({status:false, message:"Path not found."})
})

module.exports = router;
