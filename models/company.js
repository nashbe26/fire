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
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
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
});



const Company = mongoose.model('Company', companySchema);

module.exports = Company;

