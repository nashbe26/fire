const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    
  },
  employ: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  country: {
    type: String,
    
  },

  years: {
    type: String,
    
  },
  job_description: {
    type: String,
    
  },
  type:{
    type: String,
    
  },
  start_date: {
    type: String
  },
  end_date: {
    type: String,
    
  },
});

const educationSchema = new mongoose.Schema({
  school_name: {
    type: String,
    
  },

  degree: {
    type: String,
    
  },
  desc: {
    type: String,
    
  },
  grad_start_date: {
    type: String
  },
  grad_end_date: {
    type: String,
    
  },
});

const skillSchema = new mongoose.Schema({
  skill: {
    type: String,
    
  },
});

const RoleEnums = ["USER", "recruter"];

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  enterprise: {
    type: String,
    
  },
  password: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  country: {
    type: String,
    
  },
  postal_code: {
    type: String,
    
  },
  numTel: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  recovery_token: {
    type: String,
  },
  jobs: [jobSchema],
  own_jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    }
  ],
  education: [educationSchema],
  skills: [skillSchema],
  career_description: {
    type: String,
  },
  token: {
    type: String,
  },
  views: {
    type: Number,
    default:0
 
  },
  cv: {
    type: String,
 
  },
  verified: {
    type: Boolean,
  },
  additional_data: {
    type: String,
  },
  photo: {
    type: String,
  },
  cover_photo: {
    type: String,
  },
  my_condidate:[{
    id_condidate:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    status:{
      type: String,
    },
    cv:{
      type: String,
    },
    job_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    }
  }],
  saved_job:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  }],
  comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  }],
  role: {
    type: String,
    
    enum: RoleEnums,
    default: RoleEnums[1],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
