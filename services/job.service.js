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
  let updated = await Job.findOneAndUpdate({_id:jobid}, data.job, {
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
  let oneUser = await Job.findById(job_params).populate("company_id", {
    password: 0,
  }).populate({
    path: 'candidates',
    populate: {
        path: 'id_condidate',
        model: 'User'
    }
});;

  if (!oneUser) throw createError(401, "Job not Available");

  return oneUser;
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getAllJobs = async (id, job_params) => {
  let oneUser = await Job.find({status:"Active"}).populate("company_id comments likes", { password: 0 }).populate({
    path: 'comments',
    populate: {
        path: 'id_owner',
        model: 'User'
    }
});

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
    let job = new Job(data);

    let new_job = await job.save();


    let get_comp = await User.findById(id);

    get_comp.own_jobs.push(new_job._id);

    await get_comp.save();

    return get_comp;

  } catch (err) {
    console.log(err);
    return  createError(401, "you can't create a job this");
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

/**
 *
 *  This Function will update user password
 *
 */
const updateJobStatus = async (id, data) => {
  console.log(id, data);
  let jobs = await Job.findByIdAndUpdate(id,{status:data.status});

  if (!jobs) throw createError(401, "Failed to update");

  return jobs;
};

const updateJobStatsUser = async (data) => {
  let jobs = await Job.findById(data.id_job);
  let user = await User.findById(data.data.id_user);

  if (!jobs) throw createError(401, "Failed to update");
  if (!user) throw createError(401, "Failed to update");

  jobs.candidates.map(async x=>{
    if(
    x.id_condidate == data.id_user)
      x.status=data.status
      await jobs.save()
  })

  user.my_condidate.map(async x=>{
    if(
    x.id_condidate == data.id_user)
      x.status=data.status
      await user.save()
  })

  return jobs;
};

/*
 *
 *  This Function will update user password
 *
 */
const likedJobs = async (id, user_id) => {
  let job = await Job.findById(id);

  if (!job) {
    throw createError(404, "Job not found");
  }

  const existingLikeIndex = job.likes.findIndex(like => like.owner_id == user_id);

  if (existingLikeIndex !== -1) {
    // If the user has already liked the job, remove the like
    job.likes.splice(existingLikeIndex, 1);
  } else {
    // If the user has not liked the job, add the like
    const newLike = {
      owner_id: user_id,
      receiver_id: job.company_id,
    };

    job.likes.push(newLike);

  }

  await job.save();

  return { owner_id: user_id, job_id: job._id, receiver_id: job.company_id };
};

const getMostJobRec = async (id, data) => {
  let oneUser = await Job.find();

  if (!oneUser) throw createError(401, "Failed to get");

  let mostJobs = oneUser.sort(function (a, b) {
    return b.cv.length - a.cv.length;
  });

  return mostJobs.slice(0, 10);
};
const condidateJob = async (data, idJob) => {
  let jobs = await Job.findById(idJob);

  if (!jobs) throw createError(401, "Failed to get job");

  let obj;

  if (jobs.with_cover) {
    obj = {
      id_condidate: data.id,
      cover_text: data.cover,
    };
  } else {
    obj = {
      id_condidate: data.id,
    };
  }
  const newCondidate = await jobs.candidates.push(obj);
  await jobs.save();

  if (!newCondidate) throw createError(401, "Failed to save condidate");

  return newCondidate;
};
const savedJob = async (id, user_id) => {

  let users = await User.findById(id);
  const index = users.saved_job.indexOf(user_id);

  if (index === -1) {
    // If not, add the job ID
    users.saved_job.push(user_id);
  } else {
    // If yes, remove the job ID
    users.saved_job.splice(index, 1);
  }

  // Save the updated user
  await users.save();

  return users
};
const UpdateCondidate = async (id, state) => {
  try {
    console.log(id, state);
    let jobs = await Job.find();
    let job_pos = -1;
    let cond_pos = -1;

    jobs.forEach((job, key1) => {
      job.candidates.forEach(async (candidate, key2) => {
        console.log(candidate._id, id, candidate._id == id);
        if (candidate._id == id) {
          job_pos = key1;
          cond_pos = key2;
        }
      });
    });
    console.log(job_pos, cond_pos);

    if (job_pos !== -1 && cond_pos !== -1) {
      let job_updt = await Job.findById(jobs[job_pos]._id);
      job_updt.candidates[cond_pos].status = state;
      await job_updt.save();
    }

    // candidate.status = state;
    //       candidate.save({ suppressWarning: true });
    //       job.save();
  } catch (err) {
    console.log(err);
  }
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
  condidateJob,
  UpdateCondidate,
  updateJobStatus,
  likedJobs,
  savedJob,
  updateJobStatsUser
};
