const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId,
        ref: "newauthor"
    }, 
    price: Number,
    ratings: Number,
    publisher:{
        type: ObjectId,
        ref: "newpublisher"
    },
    isHardCover:{ 
        type:Boolean, 
        default:false
    },
}, { timestamps: true });

module.exports = mongoose.model('newbook', bookSchema)
