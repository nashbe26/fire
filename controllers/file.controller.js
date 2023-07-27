const asyncHandler = require("express-async-handler");

const getFileImageName = asyncHandler(async (req, res) => {
  
    if (!req.file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    
    res.status(200).json(req.file.originalname);

  });
  module.exports={
    getFileImageName
  }