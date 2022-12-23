const express  = require("express")
const bodyParser = require('body-parser');
const route  = require("./routes/route")
const {default : mongoose} = require("mongoose")
const app = express()
 

app.use(bodyParser.json())
 


mongoose.connect("mongodb+srv://bhupendra_:1B97GiRnjBfdXTL4@cluster5.fjlkdvr.mongodb.net/test",{
    useNewUrlparser : true
})
.then(()=> console.log("mongoDb is connected"))
.catch((err) => console.log(err))

app.use("/",route)

app.listen(3000,function(){
    console.log("server started Port "+3000)
})