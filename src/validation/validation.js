const joi = require("joi");

module.exports = {
  StudentModel: joi.object({
    Name: joi
      .string()
      .required()
      .messages({ "any only": "Name is mandatory field." })
      .regex(/^[a-z ,.'-]+$/i),
    Marks: joi.number().required(),
    Password: joi
      .string()
      .min(8)
      .max(15)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/)
      .required(),
    Subject: joi
      .string()
      .required()
      .messages({ "any only": "Name is mandatory field." })
      .regex(/^[a-z ,.'-]+$/i),
  }),


  filtervalidation: joi.object({
    Name: joi
      .string()
      .messages({ "any only": "Name is mandatory field." })
      .regex(/^[a-z ,.'-]+$/i),
    Subject: joi
      .string()
      .messages({ "any only": "Name is mandatory field." })
      .regex(/^[a-z ,.'-]+$/i),
  }),

  
  loginvalidation: joi.object({
    Password: joi
      .string()
      .min(8)
      .max(15)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/)
      .required(),
  }),


  updatevalidation: joi.object({
    Name: joi
      .string()
      .messages({ "any only": "Name is mandatory field." })
      .regex(/^[a-z ,.'-]+$/i),
    Marks: joi.number(),
    Password: joi
      .string()
      .min(8)
      .max(15)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,15}$/),
    Subject: joi
      .string()
      .messages({ "any only": "Name is mandatory field." })
      .regex(/^[a-z ,.'-]+$/i),
  }),
};
