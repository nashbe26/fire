const User = require("../models/user");
const createError = require("http-errors");
const Job = require("../models/job");
const { addProblemReminderNotificationCronJob } = require("../utils/cron");
let mongoose = require("mongoose");
const Company = require("../models/company");

/**
 *
 * This Function will update all user information
 *
 */
const updateJob = async (id, jobid, data) => {
  let updated = await Job.findOneAndUpdate(jobid, data, {
    returnOriginal: false,
  });

  if (!updated) throw createError(401, "job not Available");

  console.log("e", updated);

  return updated;
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getJobByName = async (jobs) => {
  console.log(jobs);
  let oneUser = await Job.find({ job_title: jobs });

  if (!oneUser) throw createError(401, "Job not Available");

  return oneUser;
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getJobById = async (id, job_params) => {
  let oneUser = await Job.findById(job_params);

  if (!oneUser) throw createError(401, "Job not Available");

  return oneUser;
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getAllJobs = async (id, job_params) => {
  let oneUser = await Job.find().populate("company_id", { password: 0 });

  if (!oneUser) throw createError(401, "User not Available");

  return oneUser;
};

const getAllJobsComp = async (id) => {
  let data = await Job.find({ company_id: id }).populate("company_id", {
    password: 0,
  });

  if (!data) throw createError(401, "User not Available");

  return data;
};
/**
 *
 *  This Function will update user password
 *
 */

const createJob = async (id, data) => {
  try {
    data.company_id = id;

    console.log(data);

    let job = new Job(data);
    let new_job = await job.save();

    if (!new_job) throw createError(401, "Failed to create new job");

    let get_comp = await Company.findById(id);
    get_comp.jobs.push(new_job);
    console.log(get_comp);
    await get_comp.save();

    if (!get_comp) throw createError(401, "you can't create a job this");

    return oneUser;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 *  This Function will update user password
 *
 */
const deleteJob = async (id, data) => {
  let jobs = await Job.findById(data);

  let oneUser = await Job.deleteOne(jobs);

  if (!oneUser) throw createError(401, "Failed to update");

  return oneUser;
};
const getMostJobRec = async (id, data) => {
  let oneUser = await Job.find();

  if (!oneUser) throw createError(401, "Failed to get");

  let mostJobs = oneUser.sort(function (a, b) {
    return b.cv.length - a.cv.length;
  });

  return mostJobs.slice(0, 10);
};

module.exports = {
  getJobByName,
  getJobById,
  updateJob,
  createJob,
  deleteJob,
  getAllJobs,
  getMostJobRec,
  getAllJobsComp,
};
