var express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
var router = express.Router();
const authRotuer = require("./auth.route");
const userRotuer = require("./user.route");
const notificationRouter = require("./notification.route");
const companyRouter = require("./company.route");
const jobRouter = require("./job.route");
const commentRouter = require("./comment.route");
const messageRouter = require("./message.route");
const disRouter = require("./disccusion.route");
const FileRouter = require("./file.route");

const contactRoute = require("./contact.route");
const sendEmailsRoute = require("./sendEmails.route");
const enrollRoute = require("./enroll.route");
const adminActionsRoute = require("./adminActions.route");

/* GET home page. */

router.use("/auth", authRotuer);
router.use("/user", authMiddleware, userRotuer);
router.use("/file", FileRouter);
router.use("/job", jobRouter);
router.use("/company", authMiddleware, companyRouter);
router.use("/notification", authMiddleware, notificationRouter);
router.use("/comment", authMiddleware, commentRouter);
router.use("/message", authMiddleware, messageRouter);
router.use("/disccusion", authMiddleware, disRouter);

router.use("/contact", contactRoute);
router.use("/send-emails", sendEmailsRoute);
router.use("/enroll-rap", enrollRoute);
router.use("/admin", adminActionsRoute);

module.exports = router;
