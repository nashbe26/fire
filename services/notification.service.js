const Notification = require("../models/notification");
const User = require("../models/user");
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
const seenNotif = async (userId) => {
  const notifications = await Notification.find({ id_receiver: userId }).catch(
    (err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    }
  );
  notifications.filter(x=>x.is_checked === false).map(async x =>{
    x.is_checked = true
    await x.save()
  })

  return notifications;
};
const getNotifications = async (userId) => {
  const notifications = await Notification.find({ id_receiver: userId }).populate('id_owner').catch(
    (err) => {
      console.log(err);
      throw httpError(500, "Internal server err");
    }
  );
  return notifications;
};

const createNotification = async ({
  id_owner,
  id_receiver,
  content,

  job_id,
  type,
}) => {
  try{
    console.log({
      id_owner,
      id_receiver,
      content,
    
      job_id,
      type,
    });
    if(type == "all"){
      const users = await User.find();
      console.log({
        id_owner,
        id_receiver,
        content,
      
        job_id,
        type,
      });
      let notification
      users.map(async x=>{
        notification = new Notification({
          id_owner: id_owner,
          id_receiver: x._id,
          description:content,
          type,
          job_id,
        });
        notification.save();
      })
      return notification;
    }else{
      const notification = new Notification({
        id_owner: id_owner,
        id_receiver:id_receiver,
        description:content,
        type,
        job_id,
      });
      notification.save();
      return notification;
    }
    
  }catch(err){
    console.log(err);
    return err
  }
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


};

module.exports = {
  deleteNotification,
  getNotifications,
  createNotification,
  seenNotif
};
