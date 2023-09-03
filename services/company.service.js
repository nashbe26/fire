const User = require("../models/user");
const createError = require("http-errors");
const Company = require("../models/company");
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
const { generateJWT } = require("../utils/jwt");
const { sendEmail, verifyYourAccount } = require("../utils/mailer");

/**
 *
 * This Function will update all user information
 *
 */
const updateCompany = async (id, jobid, data) => {
  try {
    let updated = await Company.findByIdAndUpdate(jobid, data, {
      returnOriginal: false,
    });

    if (!updated) throw createError(401, "job not Available");

    return updated;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getCompanyByName = async (name) => {
  let oneUser = await Company.find({ name });

  if (!oneUser) throw createError(401, "Job not Available");

  return oneUser;
};

/**
 *
 *  This function will returns current logged user
 *
 */

/*** */
const getCompanyById = async (job_params) => {
  try {
    let oneUser = await Company.findById(job_params);

    if (!oneUser) throw createError(401, "Job not Available");

    return oneUser;
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getAllCompany = async (id, job_params) => {
  let oneUser = await Company.find();

  if (!oneUser) throw createError(401, "User not Available");

  return oneUser;
};

/**
 *
 *  This Function will update user password
 *
 */

const createCompany = async (id, data) => {
  let is_job = await Company.findOne({ email: data.email });

  if (is_job) throw createError(401, "user exist this with email");

  const hash = bcrypt.hashSync(data.password, 10);
  data.password = hash;
  let varsToken = "LsqSp6YQZi"

  const token = generateJWT({ user: varsToken, role: "company" });;
  data.token = token;
  data.verified=false
  let dataUp = new Company(data);

  if (!dataUp) throw createError(401, "you can't create a company this");

  let oneUser = await dataUp.save();
  sendEmail(verifyYourAccount({data,token}))

  return oneUser;
};

/**
 *
 *  This Function will update user password
 *
 */
const deleteCompany = async (data) => {
  let oneUser = await Company.findByIdAndDelete(data);

  if (!oneUser) throw createError(401, "Failed to delete");

  return oneUser;
};
const updatePassword = async (id, data) => {
  let oneUser = await Company.findById(id);
  
  const hash = bcrypt.hashSync(data.password, 10);
  oneUser.password = hash;
  await oneUser.save()
  return oneUser

};
const updateImage = async (id, data) => {
  
  let oneUser = await Company.findById(id);

  if (!oneUser) throw createError(401, "Failed to get");

  oneUser.cover_photo = "http://localhost:3006/public/images/"+data.img

  const img = await oneUser.save()

  return data;
};
module.exports = {
  getCompanyByName,
  getCompanyById,
  updateCompany,
  createCompany,
  deleteCompany,
  getAllCompany,
  updatePassword,
  updateImage
};
