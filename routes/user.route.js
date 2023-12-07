const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const {
  validateCurrentUserUpdate,
} = require("../middleware/verifyTalent.midddleware");

const { uploadPDF } = require("../utils/multerCV");
const { uploadImage } = require("../utils/multer");

router.put(
  "/updateUserData",
  
  userController.updateUser
);
router.put("/updatePassword", validateCurrentUserUpdate, userController.updatePasswordUser);
router.get("/updateViews/:id", userController.updateUserViews);
router.get("/getUser", userController.getUsers);
router.get("/getUserById/:id", userController.getUserById);
router.post("/uploadCV", uploadPDF,  userController.sendCV);
router.get("/sendToRec/:job_id/:user_id", userController.sendToRec);
router.delete("/deleteUser", validateCurrentUserUpdate, userController.deleteUser);
router.put("/updateImg",uploadImage, userController.updateImg);
router.put("/updateImgPhoto",uploadImage, userController.updateImgPhoto);

module.exports = router;
