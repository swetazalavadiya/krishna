const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentmodel");
const mongoose = require("mongoose");

//............................................................. AUTHENTICATION .............................................................................................

const authentication = function (req, res, next) {
  try {
    if (!req.headers["x-api-key"]) {
      return res
        .status(400)
        .send({ status: false, message: "token must be present in headers" });
    } else {
      jwt.verify(
        req.headers["x-api-key"],
        "student",
        function (err, decodedToken) {
          if (err) {
            return res
              .status(401)
              .send({ status: false, name: err.name, message: err.message });
          } else {
            req.loginid = decodedToken.id;
            next();
          }
        }
      );
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//............................................................. AUTHORIZATION .............................................................................................

const authorization = async function (req, res, next) {
  try {
    if (req.params.studentId) {
      if (!mongoose.isValidObjectId(req.params.studentId)) {
        return res
          .status(400)
          .send({ status: false, message: "Please provide a valid studentId" });
      }
      const fetchStudent = await studentModel.findById(req.params.studentId);

      if (!fetchStudent) {
        return res
          .status(404)
          .send({ status: false, message: "studentId does not exists" });
      }
      if (req.loginid != fetchStudent._id) {
        return res
          .status(403)
          .send({
            status: false,
            message: "You are not authorised to perform this activity",
          });
      }
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports.authentication = authentication;
module.exports.authorization = authorization;
