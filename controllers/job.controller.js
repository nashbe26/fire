const asyncHandler = require("express-async-handler");
const jobService = require("../services/job.service");
const createError = require("http-errors");

// calling get user service

const getJobById = asyncHandler(async (req, res) => {
  let user_id = req.user;
  let job_params = req.params.jobId
  const job = await jobService.getJobById(user_id,job_params);
  res.status(200).json(job);
});

// calling update user sevcice

const updateJob = asyncHandler(async (req, res) => {
  let user_id = req.user;
  let {job_id} = req.params;
  if(req.role != "recruter") throw createError(401,'unauthorized')
  let job = await jobService.updateJob(user_id, job_id,req.body);
  res.status(200).json(job);
});

// calling update user service

const getJobByName = asyncHandler(async (req, res, next) => {
  const id = req.user;
  let {name} = req.params;

  const job = await jobService.getJobByName(id, name);

  res.status(200).json(job);
});
// calling update user service

const getAllJob = asyncHandler(async (req, res, next) => {
    const id = req.user;
  
    const job = await jobService.getAllJobs(id, req.body);
  
    res.status(200).json(job);
  });
const createJob = asyncHandler(async (req, res, next) => {
    const id = req.user;
    if(req.role != "recruter") throw createError(401,'unauthorized')
    const job = await jobService.createJob(id, req.body);
  
    res.status(200).json({ message: "Job successfully created" });
  });

const deleteJob  = asyncHandler(async (req, res, next) => {
    const id = req.user;
    if(req.role != "recruter") throw createError(401,'unauthorized')
    const {job_id} = req.params
    const job = await jobService.deleteJob(id, job_id);
  
    res.status(200).json({ message: "Job successfully deleted" });
  });
  

module.exports = {
    getJobById,
    getJobByName,    
    updateJob,
    createJob,
    deleteJob,
    getAllJob
};
