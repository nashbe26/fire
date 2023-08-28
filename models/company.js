const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Employer', 'Recruiter'],
    required: true
  },
  jobs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
  }],
  year: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  token: {
    type:String,
  },
  verified: {
  type: Boolean,
  },
  telephoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  certification: {
    type: String
  },
  url: {
    type: String
  },
  urlLinkedIn: {
    type: String
  },
  intPresence: {
    type: String
  },
  headOffice: {
    type: String
  },
  password: {
    type: String,
    required: true,
    
  },
  cover_photo:{
    type: String,
    required: false
  },
  logo_photo:{
    type: String,
    required: false
  },
  about:{
    type: String,
    required: true
  },
  recovery_token:{
    type: String
  }
});



const Company = mongoose.model('Company', companySchema);

module.exports = Company;

