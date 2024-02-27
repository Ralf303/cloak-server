import dbService from "./db-service.js";

export default new (class chatsService {
  async newMessage(sender, receiver, text, data) {
    if (receiver === "Избранное") {
      receiver = sender;
    }
    const chat = await dbService.getChatOnUsernames(sender, receiver);
    const message = await dbService.createMessage(sender, receiver, text, data);

    await chat.addMessage(message);
    chat.messageCounter++;
    await chat.save();
    await message.save();
  }
})();
