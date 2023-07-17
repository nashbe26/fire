const User = require("../models/user");
const createError = require("http-errors");
const Company = require("../models/company");
let mongoose = require('mongoose');
let bcrypt = require('bcrypt')

/**
 *
 * This Function will update all user information
 *
 */
const updateCompany = async (id, jobid,data) => {
  try{
    let updated = await Company.findByIdAndUpdate(jobid,data, {
      returnOriginal: false,
    });
  
    if (!updated) 
      throw createError(401, "job not Available");
  
    return updated;

  }catch(err){
    console.log(err);
  }

};


/**
 *
 *  This function will returns current logged user
 *
 */
const getCompanyByName = async (name) => {
  console.log(name);
    let oneUser = await Company.find({name});
  
    if (!oneUser) throw createError(401, "Job not Available");
  
    return oneUser;
  };

/**
 *
 *  This function will returns current logged user
 *
 */
const getCompanyById = async (job_params) => {
  try{
    
    let oneUser = await Company.findById(job_params);
  
    if (!oneUser) throw createError(401, "Job not Available");
  
    return oneUser;
  }catch(err){
    console.log(err);
  }
};

/**
 *
 *  This function will returns current logged user
 *
 */
const getAllCompany = async (id,job_params) => {

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
    
    let is_job = await Company.findOne({email:data.email})
    
    if(is_job)
      throw createError(401, "user exist this with email");
    
    const hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;

    let dataUp = new Company(data)

    if(!dataUp)
      throw createError(401, "you can't create a company this");

    let oneUser = await dataUp.save();

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
const getMostJobRec = async (id, data) => {

  let oneUser = await Company.find()

  if (!oneUser) throw createError(401, "Failed to get");

  let mostcompanies = oneUser.sort(function(a, b){return b.cv.length -a.cv.length})

  return mostcompanies.slice(0,10);
};

module.exports = {

    getCompanyByName,
    getCompanyById,
    updateCompany,
    createCompany,
    deleteCompany,
    getAllCompany
};