const studentModel = require("../models/studentmodel");
const jwt = require("jsonwebtoken");
//............................................................. REGISTER STUDENT .............................................................................................


const registerStudent = async function (req, res) {
    try {
        res.status(201).send({ status: true, data: await studentModel.create(req.body) });
    } catch (err) {
        res.status(500), send({ status: false, message: error.message });
    }
};

//............................................................. LOGIN STUDENT .............................................................................................

const login = async function (req, res) {
    try {
        const student = await studentModel.findOne({ Password: req.body.Password });
        if (!student) {
            res.status(400).send({ status: false, message: "please provide valid password" });
        }
        res.status(200).send({ status: true, token: jwt.sign({ id: student._id }, "student") });
    } catch (err) {
        res.status(500), send({ status: false, message: error.message });
    }
};

//............................................................. GET STUDENT .............................................................................................


const getStudent = async function (req, res) {
    try {
        let list
        if (req.query) {
            list = await studentModel.find(req.query)
            if (!list) {
                res.status(404).send({ status: false, message: "no student exist with this query." })
            }
            res.status(200).send({ status: true, data: list });
        } else {
            res.status(200).send({ status: true, data: await studentModel.find() });
        }
    } catch (err) {
        res.status(500), send({ status: false, message: error.message });
    }
};

//............................................................. UPDATE STUDENT .............................................................................................

const updateStudent = async function (req, res) {
    try {
        const update = await studentModel.findById(req.params.studentId);
        if (req.body.Marks) {
            req.body.Marks = req.body.Marks + update.Marks;
        }
        res.status(200).send({status: true,data: await studentModel.findOneAndUpdate(
                    { _id: req.params.studentId },
                    { ...req.body },
                    { new: true }
                ),
            });
    } catch (err) {
        res.status(500), send({ status: false, message: error.message });
    }
};


//............................................................. DELETE STUDENT .............................................................................................


const deleteStudent = async function (req, res) {
    try {
        res.sendStatus(204);
    } catch (err) {
        res.status(500), send({ status: false, message: error.message });
    }
};

module.exports.registerStudent = registerStudent;
module.exports.login = login;
module.exports.getStudent = getStudent;
module.exports.updateStudent = updateStudent;
module.exports.deleteStudent = deleteStudent;
