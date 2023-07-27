const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  discussion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discussions',
  },
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Message', MessageSchema);