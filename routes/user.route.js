const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const { uploadImage } = require("../utils/multer");
const { uploadPDF } = require("../utils/multerCV");

router.put("/updateUserData", userController.updateUser);
router.put("/updatePassword", userController.updatePasswordUser);
router.get("/updateViews/:id", userController.updateUserViews);
router.get("/getUser", userController.getUsers);
router.get("/getUserById/:id", userController.getUserById);
router.post("/updateUserImage",uploadImage ,userController.addUserPorfile);
router.post("/uploadCV",uploadPDF ,userController.sendCV);
router.get("/sendToRec/:job_id", userController.sendToRec);

module.exports = router;    
