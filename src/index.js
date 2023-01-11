require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/route.js");

const app = express();
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://sweta1234:sweta5678@sweta2.rwx6dlh.mongodb.net/test")
  .then(() => console.log("mongodb is connected successfully."))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.listen(process.env.PORT, function () {
  console.log(`Express app is running on port ${process.env.PORT}`);
});
