const Joi = require("joi");

const jobSchema = Joi.object({
  job_title: Joi.string().required(),
  employ: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  job_description: Joi.string().required(),
  work_here: Joi.boolean().optional(),
});

const educationSchema = Joi.object({
  school_name: Joi.string().required(),
  school_location: Joi.string().required(),
  degree: Joi.string().required(),
  field: Joi.string().required(),
  grad_start_date: Joi.date().required(),
  grad_end_date: Joi.date().required(),
});

const skillSchema = Joi.object({
  skill: Joi.string().required(),
});

const talentSchema = Joi.object({
  firstName: Joi.string().required(),
  sureName: Joi.string().required(),
  profession: Joi.string().required(),
  password: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  postal_code: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  jobs: Joi.array().items(jobSchema),
  education: Joi.array().items(educationSchema),
  skills: Joi.array().items(skillSchema),
  career_description: Joi.string().optional(),
  additional_data: Joi.string().optional(),
});

module.exports = talentSchema;
