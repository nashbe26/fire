
  const { verifyJWT } = require("../jwt");
  const {createNotification} = require("../../services/notification.service");
  let onlineUser = [];



  function addOnlineUser(client, io) {
    client.on("new user", (data) => {
      if (data) {
        let userId = verifyJWT(data);
  
        let userExsit = onlineUser.find((x) => x.userId == userId.payload.userId);
  
        if (!userExsit)
          onlineUser.push({
            userId: userId.payload.user,
            userSocket: client.id,
          });
      }
  
      client.emit("online user", onlineUser);
    });
  }

  function leaveUserOnline(client, io) {
    client.on("disconnect", () => {
      onlineUser = onlineUser.filter((user) => {
        return user.userSocket !== client.id;
      });
      io.emit("online user", onlineUser);
    });
  }
  
  const sendNotification = async (client,io) => {
    client.on("notification", async (data)=> {
      let notification = await createNotification(data.owner,data.receiver,data.type,data.description);
      if(notification){
        connected_User = onlineUser.filter(e => e.userId == data.receiver)
        for (let user of connected_User){
          io.to(user.userSocket).emit("notification",{action : notification.type,notification:notification});
      }
      }
    })
  };
module.exports = {
    addOnlineUser,
    leaveUserOnline,
    sendNotification,
  };