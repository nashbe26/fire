const mongoose = require("mongoose");

const Notification = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["new_job","like_job", "comment_job","submit_job","end_job"],
      required: true,
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs",
    },
    id_owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    id_receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    
    is_checked: {
      type: Boolean,
      default: false,
    },
    contract_type: {
        type: Boolean,
        default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", Notification);