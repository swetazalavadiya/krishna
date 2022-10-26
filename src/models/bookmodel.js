const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName:{
        type:String,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        default:2021
    },
    tags:{
        type:[String],
        required:true
    },
    prices:{
        indianprice:String,
        europrice:String
    },
    totalpages:{
        type:Number,
        required:true,
        default:100,
    },
    stockAvailable:{
        type:Boolean,
    }
},{ timestamps:true})
module.exports = mongoose.model('bookmodel', bookSchema)