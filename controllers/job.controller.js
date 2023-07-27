const asyncHandler = require("express-async-handler");
const jobService = require("../services/job.service");
const createError = require("http-errors");

// calling get user service

const getJobById = asyncHandler(async (req, res) => {
  let user_id = req.user;
  let job_params = req.params.jobId;
  const job = await jobService.getJobById(user_id, job_params);
  res.status(200).json(job);
});

// calling update user sevcice

const updateJob = asyncHandler(async (req, res) => {
  let user_id = req.user;
  let { job_id } = req.params;
  let job = await jobService.updateJob(user_id, job_id, req.body);
  res.status(200).json(job);
});

// calling update user service

const getJobByName = asyncHandler(async (req, res, next) => {
  let { name } = req.params;

  const job = await jobService.getJobByName(name);

  res.status(200).json(job);
});
// calling update user service

const getAllJob = asyncHandler(async (req, res, next) => {
  const name = req.params.name;

  const job = await jobService.getAllJobs(name);

  res.status(200).json(job);
});

const getCompanyJobs = asyncHandler(async (req, res, next) => {
  let { user } = req.user;

  const job = await jobService.getAllJobsComp(user._id);

  res.status(200).json(job);
});

const createJob = asyncHandler(async (req, res, next) => {
  const id = req.user.user._id;
  const job = await jobService.createJob(id, req.body);

  res.status(200).json({ message: "Job successfully created", job });
});

const deleteJob = asyncHandler(async (req, res, next) => {
  const id = req.user;
  const { job_id } = req.params;
  const job = await jobService.deleteJob(id, job_id);

  res.status(200).json({ message: "Job successfully deleted" });
});

module.exports = {
  getJobById,
  getJobByName,
  getCompanyJobs,
  updateJob,
  createJob,
  deleteJob,
  getAllJob,
};
