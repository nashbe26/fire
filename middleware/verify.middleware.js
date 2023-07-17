const Company = require("../models/company");

const validateCurrentCompanyUpdate = async (req, res, next) => {
    const {user} = req.user // Assuming the user ID is passed as a URL parameter
    // Assuming the user ID is present in the request body
    try {
      // Fetch the current user from the database
      const currentUser = await Company.findById(user._id);
      // Check if the current user is trying to update their own information
      if (currentUser._id.toString() !== user._id) {
        return res.status(403).json({ error: 'You can only update your own information or company not exsit' });
      }
  
      // Continue with the update operation if the current user is valid
      next();
    } catch (error) {
      // Handle any errors that occur during the validation process
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    validateCurrentCompanyUpdate
}