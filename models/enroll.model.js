const mongoose = require("mongoose");

module.exports = mongoose.model(
    "Enroll",
    new mongoose.Schema({
        message: {
            type: String,
            required: true,
        },
        createDate: {
            type: Date,
            required: true,
            default: new Date(),
        },
    })
);
