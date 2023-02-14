const express = require('express')
const app = express()
const route = require('./route')
const mongoose = require('mongoose')
app.use(express.json())

mongoose.set("strictQuery" , false)
mongoose.connect('URL',{useNewUrlParser : true})
.then(()=> {console.log("mongodb connected")})
.catch((err)=>{console.log(err)})

app.use('/', route)
app.listen(3000,()=>{
    console.log("server is started in port in 3001")
})