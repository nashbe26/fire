const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  commentContent: {
    type: String,
    required: true,
  },
  id_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  }
},{ timestamps: true });

module.exports = mongoose.model("Comments", Comment);