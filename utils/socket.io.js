let onlineUser = [];

function joinRoom(socket, io) {
  socket.on("newUser", (data) => {
    if (data) {
      let userId = data;

      let userExsit = onlineUser.find((x) => x.userId == userId);

      if (!userExsit) {
        let arrayTab = [];
        arrayTab.push(socket.id);
        console.log(userId);
        onlineUser.push({ userId, userSocket: arrayTab });
      } else {
        userExsit.userSocket.push(socket.id);
      }
    }
    console.log(onlineUser);
    io.emit("onlineuser", onlineUser);
  });
}

function joinChat(socket, io) {
  socket.on("join-chat", (disId) => {
    socket.join(disId);
    console.warn("user join room" + disId);
    console.log(socket.rooms);
  });
}

function joinNotification(socket, io) {
  socket.on("join-notifs", (my_id) => {
    socket.join(my_id);
    console.log("user join notifs" + my_id);
    console.log(socket.rooms);
  });
}

function leaveChat(socket, io) {
  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    console.log(`User left room: ${roomName}`);
  });
}

function notification_user(socket, io) {
  socket.on("newnotif", async (data) => {
    const resData = data.notification.email;
    let arrF = onlineUser.find((user) => {
      return user.userId == resData;
    });

    if (arrF)
      arrF.userSocket.map((x) => {
        io.to(x).emit("getNotfi", { data: data.notification });
      });
  });
}

function sendMessage(socket, io) {
  socket.on("sendMessage", ({ discussion_id, user_id, message, sender }) => {
    io.to(discussion_id).emit("message", { user_id, message });
    let arrF = onlineUser.find((user) => {
      return user.userId == sender;
    });
    console.log(arrF);
    console.log(onlineUser);
    if (arrF)
    arrF.userSocket.map((x) => {
      io.to(x).emit("newNotifMessage", { user_id, message,discussion:discussion_id });
    });   
  });
}

function sendNotification(socket, io) {
  socket.on("sendNotification", ({ user_id, data }) => {
    let newObj = {...data,is_checked : false}
    console.log({ user_id, newObj });
    io.to(user_id).emit("notification", { user_id, newObj });
  });
}

module.exports = {
  joinRoom,
  notification_user,
  sendMessage,
  joinChat,
  leaveChat,
  joinNotification,
  sendNotification,
};
