const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const {
  validateCurrentUserUpdate,
} = require("../middleware/verifyTalent.midddleware");

const { uploadPDF } = require("../utils/multerCV");

router.put(
  "/updateUserData",
  validateCurrentUserUpdate,
  userController.updateUser
);
router.put("/updatePassword", validateCurrentUserUpdate, userController.updatePasswordUser);
router.get("/updateViews/:id", userController.updateUserViews);
router.get("/getUser", userController.getUsers);
router.get("/getUserById/:id", userController.getUserById);
router.post("/uploadCV", uploadPDF, validateCurrentUserUpdate, userController.sendCV);
router.get("/sendToRec/:job_id", userController.sendToRec);
router.delete("/deleteUser", validateCurrentUserUpdate, userController.deleteUser);

module.exports = router;
