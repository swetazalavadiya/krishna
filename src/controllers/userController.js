const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const createUser = async (req, res) => {
  const data = req.body;
  const saveData = await userModel.create(data);
  res.send(saveData);
};

const login = async (req, res) => {
  const userName = req.body.emailId;
  const password = req.body.password;
  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user) {
    return res.send({ msg: "Username or password required" });
  }

  let token = jwt.sign({ userId: user._id.toString() }, "sweta");
  res.setHeader("x-auth-token", token);
  res.send({ data: token });
};

const getUserData = async (req, res) => {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  res.send({ status: true, data: userDetails });
};

const updateUserData = async (req, res) => {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    userData,
    { new: true }
  );
  res.send({ status: true, data: updatedUser });
};

const userPost = async (req, res) => {
  let user = await userModel.findById(req.params.userId);
  const message = req.body.message;
  const updatedPost = user.posts;
  updatedPost.push(message);
  const updatedData = await userModel.findOneAndUpdate(
    { _id: user._id },
    { posts: updatedPost },
    {
      new: true,
    }
  );
  res.send({ status:true, posts: updatedData });
};

module.exports.createUser = createUser;
module.exports.login = login;
module.exports.userPost = userPost;
module.exports.getUserData = getUserData;
module.exports.updateUserData = updateUserData;