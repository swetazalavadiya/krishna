require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/route/route.js");

const app = express();
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.STRING)
  .then(() => console.log("mongodb is connected successfully."))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.listen(process.env.PORT, function () {
  console.log(`Express app is running on port ${process.env.PORT}`);
});
