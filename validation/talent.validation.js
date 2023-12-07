const Joi = require("joi");

const jobSchema = Joi.object({
  job_title: Joi.string().allow(''),
  employ: Joi.string().allow(''),
  city: Joi.string().allow(''),
  country: Joi.string().allow(''),
  start_date: Joi.date().allow(''),
  end_date: Joi.date().allow(''),
  job_description: Joi.string().allow(''),
  work_here: Joi.boolean().optional(),
});

const educationSchema = Joi.object({
  school_name: Joi.string().allow(''),
  school_location: Joi.string().allow(''),
  degree: Joi.string().allow(''),
  field: Joi.string().allow(''),
  grad_start_date: Joi.date().allow(''),
  grad_end_date: Joi.date().allow(''),
});

const skillSchema = Joi.object({
  skill: Joi.string().allow(''),
});

const talentSchema = Joi.object({
  firstName: Joi.string().allow(''),
  lastName: Joi.string().allow(''),
  profession: Joi.string().allow(''),
  password: Joi.string().allow(''),
  city: Joi.string().allow(''),
  country: Joi.string().allow(''),
  postal_code: Joi.string().allow(''),
  numTel: Joi.string().allow(''),
  email: Joi.string().email().allow(''),
  jobs: Joi.array().items(jobSchema),
  education: Joi.array().items(educationSchema),
  skills: Joi.array().items(skillSchema),
  career_description: Joi.string().allow(''),
  additional_data: Joi.string().allow(''),
  role: Joi.string().allow('')
});

module.exports = talentSchema;
