const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
   let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "email or the password is incorrect",
    });
  let token = jwt.sign(
    {
      userId: user._id.toString(),
    },
    "sweta-123"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  try {
    let token = req.headers["x-auth-token"];
    if (!token)
      return res.send({ status: false, msg: "token must be required" });
    console.log(token);
    let decodedToken = jwt.verify(token, "sweta-123");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
    if (!userDetails)
      return res.send({ status: false, msg: "No user exists" });

    res.send({ status: true, data: userDetails });
  } catch (error) {
    return res.send("UserID is Incorrect ");
  }
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
};

const deletedData = async (req, res) => {
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send(`No such ${user} exists`);
  }
  let deletedUser = await userModel.findOneAndUpdate(
    { _id: user },
    { $set: { isDeleted: true } }
  );
  res.send({ status: true, data: deletedUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deletedData = deletedData;