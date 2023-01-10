const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        Name: { type: String, required: true },
        Marks: { type: Number, required: true },
        Subject: { type: String, required: true },
        Password: { type: String, required: true, min: 8, max: 15 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
