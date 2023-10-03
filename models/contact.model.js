const mongoose = require("mongoose");

const ContactMessage = mongoose.model(
  "ContactMessage",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    isUnread: {
      type: Boolean,
      required: true,
      default: true,
    },

    createDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
  })
);

module.exports = ContactMessage;
