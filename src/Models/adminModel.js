
 const mongoose = require('mongoose')

 const AdminSchema = new mongoose.Schema({

    question : {
        type : [String],
        required : true,
        trim : true
    },

    Image : String,
    Video : String,

    I : String,
    II : String,
    III : String,
    IV : String,

    rightAnswer : {
        type : String,
        required : true,
        enum : ['I', 'II', 'III', 'IV']
    }
   

 },{timestamps : true})

 module.exports = mongoose.model('Admin', AdminSchema)