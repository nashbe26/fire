const User = require("../models/user");
const Company = require("../models/company");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const Job = require("../models/company");

const sendToRec = async (id, jobId) => {
  let oneUser = await User.findById(id);

  if (!oneUser) throw createError(401, "User not Available");

  const jobCreate = await Job.findById(jobId);
  jobCreate.cv.push({
    path_CV: oneUser.cv,
    owner: oneUser._id,
  });

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
  console.log(id, data);

  let oneUser = await User.findByIdAndUpdate(id, data, {
    returnOriginal: false,
  });

  if (!oneUser) throw createError(401, "User not Available");

  let responseData = {
    firstName: oneUser.firstName,
    sureName: oneUser.sureName,
    profession: oneUser.profession,
    city: oneUser.city,
    country: oneUser.country,
    postal_code: oneUser.postal_code,
    phone: oneUser.phone,
    email: oneUser.email,
    jobs: oneUser.jobs,
    education: oneUser.education,
    skills: oneUser.skills,
    career_description: oneUser.career_description,
    additional_data: oneUser.additional_data,
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
  });

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
  });
  let role = oneUser.role === "ADMIN" ? "ADMIN" : "talent";

  if (!oneUser) {
    oneUser = await Company.findById(id, {
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    role = "company";
  }

  if (!oneUser) throw createError(401, "User not Available");

  return { user: oneUser, role };
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
};
