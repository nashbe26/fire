const Notification = require("../models/notification");
const httpError = require("http-errors");

const deleteNotification = async (notificationId, userId) => {
  const notification = await Notification.findById(notificationId).catch(
    (err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    }
  );
  if (!notification) throw httpError(404, "can not find this notification");
  if (notification.id_receiver.toString() === userId.toString()) {
    await notification.deleteOne().catch((err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    });
    return "notification deleted";
  } else {
    return "you can only delete your notification";
  }
};

const getNotifications = async (userId) => {
  const notifications = await Notification.find({ id_receiver: userId }).catch(
    (err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    }
  );
  return notifications;
};

const createNotification = async ({
  owner,
  receiver,
  description,
  job_id,
  type,
}) => {
  /*switch (type) {
    case "new_job":
      description =
        "un nouveau emploi a ete creer qui reponds a vos qualifications";
      break;
    case "like_job":
      description =
        receiver.firstName +
        " " +
        receiver.lastName +
        "a aimé votre offre de travail";
      break;
    case "comment_job":
      description =
        receiver.firstName +
        " " +
        receiver.lastName +
        "a commenté votre offre de travail";
      break;
    case "submit_job":
      description =
        receiver.firstName +
        " " +
        receiver.lastName +
        "a condidaté à votre offre de travail";
      break;
    case "end_job":
      description =
        "Votre offre de travail est expiré. veuillez la renouveller ou la retirer";
      break;
  }*/

  const notification = await Notification.create({
    id_owner: owner,
    id_receiver: receiver,
    description,
    type,
    job_id,
  });
  notification.save();

  return notification;
};

module.exports = {
  deleteNotification,
  getNotifications,
  createNotification,
};
