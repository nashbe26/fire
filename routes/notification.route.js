const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.get("/get_my_notifs", notificationController.getNotifications);
router.post("/create", notificationController.CreateNotif);
router.delete(
  "/delete/:notificationId",
  notificationController.deleteNotification
);

module.exports = router;
