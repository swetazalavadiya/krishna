const express = require("express")
const mongoose = require("mongoose")
const route = require('./src/route/route');
const app = express()


const multer= require("multer");

app.use( multer().any())
app.use(express.json())


mongoose.connect("mongodb+srv://Vashika:Vanshikaa08@cluster0.on6mcgr.mongodb.net/test")
.then(() => console.log("MongoDB is connected"))
.catch((error) => console.log(error))



app.use('/', route);


app.listen(3000, function () {
console.log('Express app running on port ' + 3000)})