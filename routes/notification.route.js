const express = require("express");
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

router.get('/',notificationController.getNotifications);
router.delete('/delete/:notificationId',notificationController.deleteNotification)


module.exports = router;