let onlineUser = []


function joinRoom(socket, io) {

  socket.on('newUser', (data) => {

    if (data) {
      let userId = data;

      let userExsit = onlineUser.find((x) => x.userId == userId)

      if (!userExsit) {
        let arrayTab = [];
        arrayTab.push(socket.id)
        console.log(userId); 0
        onlineUser.push({ userId, userSocket: arrayTab })
      } else {
        userExsit.userSocket.push(socket.id)
      }
    }
    console.log(onlineUser);
    io.emit('onlineuser', onlineUser)
  })

}

function joinChat(socket, io) {
  socket.on('join-chat', (disId) => {
    socket.join(disId)
    console.warn("user join room"+disId);
  })
}

function leaveChat(socket, io){
  socket.on('leaveRoom', (roomName) => {
    socket.leave(roomName);
    console.log(`User left room: ${roomName}`);
  });
}

function notification_user(socket, io) {
  socket.on("newnotif", async (data) => {

    const resData = data.notification.email
    let arrF = onlineUser.find((user) => { return user.userId == resData });

    if (arrF)
      arrF.userSocket.map((x) => {
        io.to(x).emit("getNotfi", { data: data.notification });
      })


  });
}

function sendMessage(socket, io) {

  socket.on('sendMessage', (discussionId,message, user) => {
    
    console.log(    
      io.sockets.adapter.rooms
    );

    io.to(socket.rooms).emit('message', { user, text: message });

  });

}

module.exports = {
  joinRoom,
  notification_user,
  sendMessage,
  joinChat,
  leaveChat
}