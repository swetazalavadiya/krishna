const mongoose = require("mongoose")

// { fname: { mandatory}, 
// lname: {mandatory}, 
// title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }


const authorSchema = new mongoose.Schema({

    firstName : {
        type :String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    title : {
        type : String,
        enum: [Mr, Mrs, Miss]
    },
    email : {
        type :String,
        required : true,
        trim :true,
        unique : true,
        lowercase :true,
        match : ["/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/"],
        
    },
    password : {
        type : String,
        required : true
    }
   
})

module.exports = mongoose.model('Author',authorSchema)