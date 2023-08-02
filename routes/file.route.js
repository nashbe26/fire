const express = require("express");
const router = express.Router();

const fileController = require("../controllers/file.controller");
const {
  validateCurrentUserUpdate,
} = require("../middleware/verifyTalent.midddleware");

const { uploadImage } = require("../utils/multer");

router.post(
  "/updateUserImage",
  // validateCurrentUserUpdate,
  uploadImage,
  fileController.getFileImageName
);

module.exports = router;
