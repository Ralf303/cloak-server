class ChatService {
  sendMessage(socket, msg) {
    socket.broadcast.emit("newMessage", {
      receiver: msg.receiver,
      sender: msg.sender,
      message: msg.message,
    });
  }

  deleteChat(socket, msg) {
    socket.broadcast.emit("deleteChat", {
      userOne: msg.userOne,
      userTwo: msg.userTwo,
    });
  }
}

export default new ChatService();
