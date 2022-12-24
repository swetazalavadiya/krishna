const express  = require("express")
const bodyParser = require('body-parser');
const route  = require("./router/router")
const {default : mongoose} = require("mongoose")
const app = express()
 
mongoose.set('strictQuery', true);
app.use(bodyParser.json())
 


mongoose.connect("mongodb+srv://bhupendra_:1B97GiRnjBfdXTL4@cluster5.fjlkdvr.mongodb.net/backend-engneering-test",{
    useNewUrlparser : true
})
.then(()=> console.log("mongoDb is connected"))
.catch((err) => console.log(err))

app.use("/",route)

app.listen(3000,function(){
    console.log("server started Port "+3000)
})