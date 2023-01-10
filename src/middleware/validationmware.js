const validation = require("../validation/validation.js");

module.exports = {
  studentvalidation: (req, res, next) => {
    const { error } = validation.StudentModel.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },


  filtervalidation: (req, res, next) => {
    const { error } = validation.filtervalidation.validate(req.query);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },


  updatevalidation: (req, res, next) => {
    const { error } = validation.updatevalidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },

  
  loginvalidation: (req, res, next) => {
    const { error } = validation.loginvalidation.validate(req.body);
    if (error) {
      return res.status(400).send({ status: false, message: error.message });
    } else next();
  },
};
