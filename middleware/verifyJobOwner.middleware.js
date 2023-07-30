const Company = require("../models/company");
const Job = require("../models/job");

const validateJobOwnerUpdate = async (req, res, next) => {
  const user = req.user.user; // Assuming the user ID is passed as a URL parameter
  // Assuming the user ID is present in the request body
  try {
    // Fetch the current user from the database
    const currentJob = await Job.findById(req.params.job_id);
    // Check if the current user is trying to update their own information
    if (currentJob.company_id.toString() !== user._id) {
      return res.status(403).json({
        error: "You can only update your own information or company not exsit",
      });
    }

    // Continue with the update operation if the current user is valid
    next();
  } catch (error) {
    // Handle any errors that occur during the validation process
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  validateJobOwnerUpdate,
};
