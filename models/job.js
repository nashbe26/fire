const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    id_condidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "En attente",
    },
    cv: {
      type: String,
    },
  },
  { timestamps: true }
);

const jobSchema = new mongoose.Schema(
  {
    job_title: {
      type: String,
    },

    job_location: {
      type: String,
    },
    job_country: {
      type: String,
    },
    job_type: {
      type: String,
    },

    job_exp: {
      type: String,
    },
    job_area: {
      type: String,
    },
    job_educ_level: {
      type: String,
    },

    job_deadline_apply: {
      type: Date,
    },
    with_cover: {
      type: Boolean,
    },
    description_job: {
      type: String,
    },
    description_diplomat: {
      type: String,
    },
    status: {
      type: String,
      default: "Active",
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        owner_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        reveiver_id:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
      },
  }],
    comments:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    }],
    candidates: [candidateSchema],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
