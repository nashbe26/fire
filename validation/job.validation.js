const Joi = require("joi");

const candidateSchema = Joi.object({
  id_condidate: Joi.string().required(),
  checked_before: Joi.boolean().default(false),
  status: Joi.string()
    .valid("refused", "accepted", "pending")
    .default("submitted"),
});

const jobSchema = Joi.object({
  job_title: Joi.string().required(),
  work_type: Joi.string().required(),
  job_location: Joi.string().required(),
  job_type: Joi.string().required(),

  job_exp: Joi.string().required(),
  job_area: Joi.string().required(),
  job_educ_level: Joi.string().required(),

  job_deadline_apply: Joi.date().required(),
  with_cover: Joi.boolean().required(),
  description_job: Joi.string().required(),
  company_id: Joi.string().required(),
  candidates: Joi.array().items(candidateSchema),
});

module.exports = {
  jobSchema,
};
