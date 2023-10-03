const asyncHandler = require("express-async-handler");
const {
  getUsers,
  getUserById,
  deleteUser,
  getJobs,
  getJobById,
  deleteJob,
} = require("../services/adminActions.service");
const { log } = require("handlebars");

const getUsersController = asyncHandler(async (req, res) => {
  const users = await getUsers();
  return res.json({ users });
});

const getUserByIdController = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json({ user });
});

const deleteUserController = asyncHandler(async (req, res) => {
  await deleteUser(req.params.id);
  return res.json({ success: true });
});

const getJobsController = asyncHandler(async (req, res) => {
  const jobs = await getJobs();
  return res.json({ jobs });
});

const getJobByIdController = asyncHandler(async (req, res) => {
  const job = await getJobById(req.params.id);
  return res.json({ job });
});

const deleteJobController = asyncHandler(async (req, res) => {
  // console.log("BBB", req.body.data);
  await deleteJob(req.params.id);
  return res.json({ success: true });
});

module.exports = {
  getUsersController,
  getUserByIdController,
  deleteUserController,
  getJobsController,
  getJobByIdController,
  deleteJobController,
};
