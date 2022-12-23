const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    cardNumber: String ,
    cardType :String ,
    customerName  : String,
    status : {
        type :String,
        Default: 'ACTIVE'
    },
    vision :  String,
    customerID : String ,
    table : String
},{timestamps : true})

module.exports = mongoose.model("card", cardSchema)
