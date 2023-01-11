const studentModel = require("../models/studentmodel");
const jwt = require("jsonwebtoken");

const registerStudent = async function (req, res) {
    try {
        let data=req.body
        let createData = await studentModel.create(data)
        res.status(201).send({ status: true, data: createData });
    } catch (err) {
        res.status(500), send({ status: false, message: err.message, message: "server error"});
    }
};

const login = async function (req, res) {
    try {
        let {Password}=req.body
        const student = await studentModel.findOne({ Password: Password });
        if (!student) res.status(400).send({ status: false, message: "please provide valid password" });
        res.status(200).send({ status: true, token: jwt.sign({ id: student._id }, "sweta") });
    } catch (err) {
        res.status(500), send({ status: false, message: err.message, message: "server error" });
    }
};

const getStudent = async function (req, res) {
    try {
        let data=req.query
        let getdata = await studentModel.find(data)
        
        if (!getdata) res.status(404).send({ status: false, message: "no student exist with this query." })
        res.status(200).send({ status: true, data: getdata, message: "Student details"  });
        
    } catch (err) {
        res.status(500), send({ status: false, message: err.message, message: "server error" });
    }
};

const updateStudent = async function (req, res) {
    try {
        studentId=req.params.studentId
        let {Marks}=req.body.Marks
        
        const findId = await studentModel.findById({studentId:studentId});
        if (Marks) {
            Marks = Marks + findId.Marks;
        }
        let update= await studentModel.findOneAndUpdate({ _id:studentId },{Marks:Marks },{ new: true })
        if (!update) return res.status(404).send({ message: "no data update" })
        res.status(200).send({ status: true, msg: update, message: "data updated successfully" })

    } catch (err) {
        res.status(500), send({ status: false, message: err.message , message: "server error"});
    }
};

const deleteStudent = async function (req, res) {
    try {
    let id = req.params.studentId
    if (!id) return res.status(400).send({ status: false, message: "please enter studentId" })
    if(id){
    res.Status(204).send({ status: true, msg: update, message: "data deleted successfully" });
    }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message, message: "server error" });
    }
};

module.exports.registerStudent = registerStudent;
module.exports.login = login;
module.exports.getStudent = getStudent;
module.exports.updateStudent = updateStudent;
module.exports.deleteStudent = deleteStudent;
