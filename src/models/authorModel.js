const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    author_id:{
    type:Number,
    required:true
    },
    author_name:{
    type:String,
    required:true 
    },
    age:{
    type:Number,
    required:true
    },
    address:{
    type:String,
    required:true
    }
},{ timestamps:true})

module.exports=mongoose.model('authors', authorSchema)