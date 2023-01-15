const express = require('express');
const multer = require('multer')
const route = require('./router');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());
app.use(multer().any());


mongoose.set('strictQuery', false)
mongoose.connect("url", {
useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

 

app.use('/', route)


app.use(function(req,res){
    res.status(404).send({status:false,message:"incorrect url"})
})

app.listen(3000, function(){
    console.log("server is stated in port", 3000);
})