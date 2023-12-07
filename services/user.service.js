const User = require("../models/user");
const Company = require("../models/company");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const Job = require("../models/job");

const sendToRec = async (id, jobId) => {
  let oneUser = await User.findById(id);

  if (!oneUser) throw createError(401, "User not Available");

  const jobCreate = await Job.findById(jobId);

  let user = {
    id_condidate:oneUser._id,
    status:"En attente",
    job_id:jobId,
    cv:oneUser.cv
  }

  jobCreate.candidates.push(user);
  oneUser.my_condidate.push(user)
  await oneUser.save()
  let newJob = await jobCreate.save();

  if (!newJob) throw createError(401, "UPDATE FAILED");
  return newJob;
};

/**
 *
 * This Function will update all user information
 *
 */
const updateUser = async (id, data) => {

  let oneUser 
  if(data.types =="exp"){

    oneUser = await User.findById(id);
    oneUser.jobs.push(data)
    await oneUser.save()
  }else if (data.types =="fr"){
    oneUser = await User.findById(id);
    oneUser.education.push(data)
    await oneUser.save()
  }else{
    oneUser = await User.findByIdAndUpdate(id, data, {
      returnOriginal: false,
    });
  }

 

  if (!oneUser) throw createError(401, "User not Available");

  let responseData = {
    firstName: oneUser.firstName,
    sureName: oneUser.sureName,
    city: oneUser.city,
    country: oneUser.country,
    postal_code: oneUser.postal_code,
    phone: oneUser.phone,
    email: oneUser.email,
    jobs: oneUser.jobs,
    education: oneUser.education,
    skills: oneUser.skills,
    photo: oneUser.photo,
    cover_photo: oneUser.cover_photo,
  };

  return responseData;
};

/**
 *
 * This Function will search for current user and update his image
 *
 */

const addUserPorfile = async (id, img) => {
  let oneUser = await User.findOneAndUpdate(
    { _id: id },
    { picture: img },
    {
      returnOriginal: false,
    }
  );

  if (!oneUser) throw createError(401, "User not Available");

  return oneUser;
};

/**
 *
 *  This function will returns current logged user
 *
 */

const sendCV = async (id, cv) => {
  let oneUser = await User.findOneAndUpdate(
    { _id: id },
    { cv: cv },
    {
      returnOriginal: false,
    }
  );

  if (!oneUser) throw createError(401, "User not Available");

  return oneUser;
};

/**
 *
 *  This function will returns user by idr
 *
 */
const getUserById = async (id) => {
  let oneUser = await User.findById(id, {
    password: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  }).populate('own_jobs my_condidate saved_job');

  if (!oneUser) throw createError(401, "User not Available");

  return oneUser;
};

/** this will return logged user */
const getUsers = async (id) => {
  
  let oneUser = await User.findById(id, {
    password: 0,
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  }).populate('own_jobs').populate({
    path: 'my_condidate',
    populate: { path: 'company_id' }
  }).populate({
    path: 'saved_job',
    populate: { path: 'company_id' }
  }).populate({
    path: 'my_condidate',
    populate: { 
    path: 'job_id',
    populate:'company_id'
  }
  })

  if (!oneUser) throw createError(401, "User not Available");

  return oneUser;
};

/** this function will delete the password */
const deleteUser = async (id) => {
  let oneUser = await User.findByIdAndDelete(id);

  if (!oneUser) throw createError(401, "Failed to delete");

  return "User deleted";
};
/**
 *
 *  This Function will update user password
 *
 */
const updatePasswordUser = async (id, data) => {
  if (!data.password) throw createError(401, "Password doesnt exist");

  const hash = bcrypt.hashSync(data.password, 10);

  let oneUser = await User.findOneAndUpdate(
    { _id: id },
    { password: hash },
    {
      returnOriginal: false,
    }
  );

  if (!oneUser) throw createError(401, "Failed to update");

  return oneUser;
};

const updateUserViews = async (id, data) => {
  if (id != data) {
    let oneUser = await User.findOneAndUpdate(
      { _id: data },
      { $inc: { views: 1 } },
      {
        returnOriginal: false,
      }
    );

    if (!oneUser) throw createError(401, "Failed to update");

    return oneUser;
  } else return "cant edit user accout";
};
const updateImage = async (id, data) => {
  
  let oneUser = await User.findById(id);

  if (!oneUser) throw createError(401, "Failed to get");

  oneUser.cover_photo = "http://localhost:3006/public/images/"+data

  const img = await oneUser.save()

  return data;
};
const updateImgPhoto = async (id, data) => {
  
  let oneUser = await User.findById(id);

  if (!oneUser) throw createError(401, "Failed to get");

  oneUser.photo = "http://localhost:3006/public/images/"+data

  const img = await oneUser.save()

  return data;
};

module.exports = {
  addUserPorfile,
  updateUser,
  getUserById,
  updatePasswordUser,
  sendCV,
  sendToRec,
  updateUserViews,
  getUsers,
  deleteUser,
  updateImage,
  updateImgPhoto
};
