const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  job_title: {
    type: String,
    required: true
  },
  employ: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  job_description: {
    type: String,
    required: true
  }
});

const educationSchema = new mongoose.Schema({
  school_name: {
    type: String,
    required: true
  },
  school_location: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  grad_start_date: {
    type: Date,
    required: true
  },
  grad_end_date: {
    type: Date,
    required: true
  }
});

const skillSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  sureName: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  password:{

    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postal_code: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  jobs: [jobSchema],
  education: [educationSchema],
  skills: [skillSchema],
  career_description: {
    type: String
  },
  additional_data: {
    type: String
  },
  photo:{
    type:String
  },
  cover_photo:{
    type:String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
