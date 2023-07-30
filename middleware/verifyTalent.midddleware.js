const User = require("../models/user");
const Company = require("../models/company");

const validateCurrentUserUpdate = async (req, res, next) => {
  const id = req.user.user._id; // Assuming the user ID is passed as a URL parameter
  // Assuming the user ID is present in the request body

  try {
    // Fetch the current user from the database
    let currentUser = await User.findById(id);

    if (!currentUser) {
      currentUser = await Company.findById(id);
    }

    // Check if the current user is trying to update their own information
    if (currentUser._id.toString() !== id) {
      return res
        .status(403)
        .json({ error: "You can only update your own information." });
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
  validateCurrentUserUpdate,
};
