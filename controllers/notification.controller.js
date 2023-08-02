const asyncHandler = require("express-async-handler");
const notificationServices = require("../services/notification.service");

const deleteNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.notificationId;
  let deleted = await notificationServices.deleteNotification(
    notificationId,
    req.user
  );
  res.status(200).json({ message: deleted });
});

const getNotifications = asyncHandler(async (req, res) => {
  console.log(req.user.user._id);
  let notifications = await notificationServices.getNotifications(
    req.user.user._id
  );
  res.status(200).json({ notifications: notifications });
});

const CreateNotif = asyncHandler(async (req, res) => {
  const owner = req.user.user._id;
  const { receiver, description, job_id, type } = req.body;

  let notifications = await notificationServices.createNotification({
    owner,
    receiver,
    description,
    job_id,
    type,
  });
  res.status(200).json({ notifications: notifications });
});

module.exports = {
  deleteNotification,
  getNotifications,
  CreateNotif,
};
