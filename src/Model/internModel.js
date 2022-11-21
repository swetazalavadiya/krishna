const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        valid: true,
        unique: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        valid: true,
        unique: true,
        trime: true
    },
    collegeId: {
        type: ObjectId,
        ref: 'CollegeData',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Intern', internSchema)