class ChatService {
  sendMessage(socket, msg) {
    socket.broadcast.emit("newMessage", {
      message: msg.message,
      sender: msg.sender,
    });
  }

  send;
}

export default new ChatService();
