const User = require("../models/user");
const Job = require("../models/job");

//user services
const getUsers = async () => {
    return await User.find().select("-password");
};

const getUserById = async (id) => {
    return await User.findById(id).select("-password");
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

//job services
const getJobs = async () => {
    return await User.find();
};

const getJobById = async (id) => {
    return await Job.findById(id);
};

const deleteJob = async (id) => {
    return Job.findByIdAndDelete(id);
};

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    getJobs,
    getJobById,
    deleteJob,
};
