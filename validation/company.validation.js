const Joi = require('joi');

const companySchema = Joi.object({
  name: Joi.string().required(),
  about: Joi.string().required(),
  type: Joi.string().valid('Employer', 'Recruiter').required(),
  year: Joi.number().required(),
  number: Joi.number().required(),
  telephoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  certification: Joi.string().optional(),
  url: Joi.string().optional(),
  urlLinkedIn: Joi.string().optional(),
  intPresence: Joi.string().optional(),
  headOffice: Joi.string().optional(),
  cover_photo: Joi.string().optional(),
  logo_photo: Joi.string().optional(),
  password: Joi.string().required()
});

module.exports = companySchema;







