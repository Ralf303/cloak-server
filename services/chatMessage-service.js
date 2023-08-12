class ChatMessageService{

  sendMessage(socket, msg){
    socket.broadcast.emit("newMessage",{ message: msg.message, sender: msg.sender } )
  }

}

export default new ChatMessageService()