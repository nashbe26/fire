const User = require("../models/user");
const createError = require("http-errors");
const Job = require("../models/job");
const { addProblemReminderNotificationCronJob } = require("../utils/cron");
let mongoose = require('mongoose');


/**
 *
 * This Function will update all user information
 *
 */
const updateJob = async (id, jobid,data) => {

  let jobs = await Job.findById(jobid)
    console.log(jobs);
  if (jobs.recruter != id)
    throw createError(401, "you can't delete this");

  let updated = await jobs.updateOne(data, {
    returnOriginal: false,
  });

  if (!updated) throw createError(401, "job not Available");

  console.log("e",updated);

  return updated;
};


/**
 *
 *  This function will returns current logged user
 *
 */
const getJobByName = async (id,jobs) => {
    let oneUser = await Job.find({diplomat:jobs}).populate('recruter');
  
    if (!oneUser) throw createError(401, "Job not Available");
  
    return oneUser;
  };

/**
 *
 *  This function will returns current logged user
 *
 */
const getJobById = async (id,job_params) => {

  let oneUser = await Job.findById(job_params).populate('recruter').populate('cv.owner');

  if (!oneUser) throw createError(401, "Job not Available");

  return oneUser;
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getAllJobs = async (id,job_params) => {

    let oneUser = await Job.find().populate('recruter').populate('comments');;
  
    if (!oneUser) throw createError(401, "User not Available");
  
    return oneUser;
  };

/**
 *
 *  This Function will update user password
 *
 */

const createJob = async (id, data) => {
    
    let dataUp = {
        ...data,
    recruter:mongoose.Types.ObjectId(id)
}

  let oneUser = await Job.create(
    dataUp
  );

let up = await  User.findByIdAndUpdate(id,{
    $push:{
    job_rec:{job_id: oneUser._id,date:Date.now()}
        
    }
},{returnOriginal:false})

  if (!oneUser || !up ) throw createError(401, "Failed to update");

  

  addProblemReminderNotificationCronJob(oneUser._id,up.firstName);

  return oneUser;
};

/**
 *
 *  This Function will update user password
 *
 */
const deleteJob = async (id, data) => {

    let jobs = await Job.findById(data)
    console.log(data);
    if (jobs.recruter != id)
    throw createError(401, "you can't delete this");
    let oneUser = await Job.deleteOne(
        jobs
    );
  
    if (!oneUser) throw createError(401, "Failed to update");
  
    return oneUser;
  };
const getMostJobRec = async (id, data) => {

  let oneUser = await Job.find()

  if (!oneUser) throw createError(401, "Failed to get");

  let mostJobs = oneUser.sort(function(a, b){return b.cv.length -a.cv.length})

  return mostJobs.slice(0,10);
};

module.exports = {

    getJobByName,
    getJobById,
    updateJob,
    createJob,
    deleteJob,
    getAllJobs,
    getMostJobRec 

};