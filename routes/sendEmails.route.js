const router = require("express").Router();

const {
  sendEmailsController,
} = require("../controllers/sendEmails.controller");
const isAdminMiddleware = require("../middleware/isAdmin.middleware");

router.post(
  "/",
  // isAdminMiddleware,
  sendEmailsController
);

module.exports = router;
