
 const mongoose = require('mongoose')

 const studentSchema = new mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    rollNumber : {
        type : Number,
        require : true
    },
    school : {
        type: String,
        require : true
    }

 },{timestamps : true})

 module.exports = mongoose.model('student', studentSchema)