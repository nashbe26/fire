const Joi = require("joi");

const companySchema = Joi.object({
  // First Part
  name: Joi.string().required(), // Company Name
  type: Joi.string().valid("Employer", "Recruiter").required(), // Type
  year: Joi.number().required(), // Year Created
  number: Joi.string().required(), // Number of employees
  telephoneNumber: Joi.string().required(), // Telephone Number
  email: Joi.string().email().required(), // E-mail Address
  country: Joi.string().required(), // Country
  city: Joi.string().required(), // City
  certification: Joi.string().optional(), // Certificate of incorporation  Number.
  url: Joi.string().optional(), // Add company url
  urlLinkedIn: Joi.string().optional(), // Company LinkedIn
  intPresence: Joi.string().optional(), // International presence
  headOffice: Joi.string().optional(), // Head  office Location
  password: Joi.string().required(), // Create password + Confirm password

  // Second Part
  about: Joi.string().required(), // About
  cover_photo: Joi.string().optional(),
  logo_photo: Joi.string().optional(),
});

module.exports = companySchema;
