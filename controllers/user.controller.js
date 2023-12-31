const asyncHandler = require("express-async-handler");
const userService = require("../services/user.service");

// calling get user service

const getUsers = asyncHandler(async (req, res) => {
  let user = req.user;
  console.log("one user", user, user.role);
  const response = await userService.getUsers(user._id);
  res.status(200).json(response);
});

const deleteUser = asyncHandler(async (req, res) => {
  let { user } = req.user;
  const response = await userService.deleteUser(user._id);
  res.status(200).json({ response });
});

const getUserById = asyncHandler(async (req, res) => {
  let user_id = req.params.id;
  const user = await userService.getUserById(user_id);
  res.status(200).json(user);
});

// calling add photo service

// calling add photo service

const sendCV = asyncHandler(async (req, res) => {
  let user_id = req.user;

  if (!req.file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }

  let users = await userService.sendCV(user_id, req.file.originalname);

  res.status(200).json(users);
});

// calling add photo service

const sendToRec = asyncHandler(async (req, res) => {
  let { job_id } = req.params;
  let { user_id } = req.params;

  let users = await userService.sendToRec(user_id, job_id);

  res.status(200).json(users);
});

// calling update user sevcice

const updateUser = asyncHandler(async (req, res) => {
  let user_id = req.user._id;
  let users = await userService.updateUser(user_id, req.body);
  res.status(200).json(users);
});

// calling update user service

const updatePasswordUser = asyncHandler(async (req, res, next) => {
  const id = req.user;

  const user = await userService.updatePasswordUser(id, req.body);

  res.status(200).json({ message: "user password successfully updated" });
});

const updateUserViews = asyncHandler(async (req, res) => {
  let user_id = req.user;
  let { id } = req.params;
  let views = await userService.updateUserViews(user_id, id);
  res.status(200).json(views);
});
const updateImg = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  if (!req.file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  
  const job = await userService.updateImage(id,req.file.originalname);

  res.status(200).json({ message: "Job successfully created" });
});
const updateImgPhoto = asyncHandler(async (req, res, next) => {
  const id = req.user._id;
  if (!req.file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  
  const job = await userService.updateImgPhoto(id,req.file.originalname);

  res.status(200).json({ message: "Job successfully created" });
});
module.exports = {
  getUsers,
  updateUser,
  updatePasswordUser,
  sendCV,
  sendToRec,
  updateUserViews,
  getUserById,
  deleteUser,
  updateImg,
  updateImgPhoto
};
