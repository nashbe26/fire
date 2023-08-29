const asyncHandler = require("express-async-handler");
const companyService = require("../services/company.service");
const createError = require("http-errors");

// calling get user service

const getCompanyById = asyncHandler(async (req, res) => {
  let job_params = req.params.jobId
  const job = await companyService.getCompanyById(job_params);
  res.status(200).json(job);
});

// calling update user sevcice

const updateCompany = asyncHandler(async (req, res) => {
  let user_id = req.user.user._id;
  let job_id = req.params.job_id
  let job = await companyService.updateCompany(user_id, job_id,req.body);
  res.status(200).json(job);
});

const updatePassword = asyncHandler(async (req, res) => {
  let user_id = req.user.user._id;
  let job = await companyService.updatePassword(user_id,req.body);
  res.status(200).json(job);
});

// calling update user service

const getCompanyByName = asyncHandler(async (req, res, next) => {
  let {name} = req.params;

  const job = await companyService.getCompanyByName(name);

  res.status(200).json(job);
});
// calling update user service

const getAllCompany = asyncHandler(async (req, res, next) => {
    const id = req.user;
  
    const job = await companyService.getAllCompany(id, req.body);
  
    res.status(200).json(job);
});

const deleteCompany  = asyncHandler(async (req, res, next) => {

    const {job_id} = req.params
    const job = await companyService.deleteCompany(job_id);
  
    res.status(200).json({ message: "Job successfully deleted" });
  });
  
  const createCompany = asyncHandler(async (req, res, next) => {
    const id = req.user;
    const job = await companyService.createCompany(id, req.body);
  
    res.status(200).json({ message: "Job successfully created" });
});
module.exports = {
    createCompany,
    getCompanyById,
    getCompanyByName,    
    updateCompany,
    deleteCompany,
    getAllCompany,
    updatePassword
};
