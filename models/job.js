const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    id_condidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    checked_before: false,
    status: {
      type: String,
      enum: ["refused", "accepted", "pending"],
      default: "pending",
    },
    cover_text: {
      type: String,
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
      required: true,
    },
    work_type: {
      type: String,
      required: true,
    },
    job_location: {
      type: String,
      required: true,
    },
    job_type: {
      type: String,
      required: true,
    },

    job_exp: {
      type: String,
      required: true,
    },
    job_area: {
      type: String,
      required: true,
    },
    job_educ_level: {
      type: String,
      required: true,
    },

    job_deadline_apply: {
      type: Date,
      required: true,
    },
    with_cover: {
      type: Boolean,
      required: true,
    },
    description_job: {
      type: String,
      required: true,
    },
   
    status: {
      type: String,
      enum: ["posted", "closed", "expired", "archived"],
      default: "posted",
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    candidates: [candidateSchema],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
