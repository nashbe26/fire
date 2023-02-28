var express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
var router = express.Router();
const authRotuer = require('./auth.route')
const userRotuer = require('./user.route')
const notificationRouter = require('./notification.route')
const jobRouter = require('./job.route')
const commentRouter = require('./comment.route');



/* GET home page. */

router.use('/auth',authRotuer);
router.use('/user',authMiddleware,userRotuer);
router.use("/job",authMiddleware,jobRouter);
router.use("/notification",authMiddleware,notificationRouter);
router.use("/comment",authMiddleware,commentRouter);


module.exports = router;
