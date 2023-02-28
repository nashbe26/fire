const asyncHandler = require("express-async-handler");
const notificationServices = require("../services/notification.service");


const deleteNotification = asyncHandler(async(req,res)=> {
    
    const notificationId =req.params.notificationId;
    let deleted = await notificationServices.deleteNotification(notificationId,req.user);
    res.status(200).json({message : deleted})
    
})

const getNotifications = asyncHandler(async(req,res)=> {
    
    let notifications = await notificationServices.getNotifications(req.user);
    res.status(200).json({notifications : notifications});
});



module.exports = {
    deleteNotification,
    getNotifications
  };