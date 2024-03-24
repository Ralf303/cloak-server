import chatsService from "../services/chats-service.js";
import dbService from "../services/db-service.js";

export default new (class chatControler {
  async newChat(req, res) {
    try {
      const { user2 } = req.body;
      const chat = await dbService.createChat(req.user.id, user2);
      return res.status(200).json({ chatInfo: chat });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  }

  async getChats(req, res) {
    try {
      const chats = await dbService.getChatsOnId(req.user.id);
      return res.status(200).json({ chats: chats, userId: req.user.id });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  }

  async newMessage(req, res) {
    try {
      const { sender, receiver, text, data } = req.body;
      await chatsService.newMessage(sender, receiver, text, data);
      return res.status(200).json({ status: "ok" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  }

  async getMessages(req, res) {
    try {
      const { user1, user2 } = req.query;
      const messages = await dbService.getMessages(user1, user2);
      return res.status(200).json({ mes: messages });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  }

  async deleteChat(req, res) {
    try {
      let { userOne, userTwo } = req.query;

      if (userOne === "Избранное") {
        const status = await dbService.deleteMessages(userTwo);
        return res.status(200).json({ status });
      }

      const status = await dbService.deleteChat(userOne, userTwo);
      return res.status(200).json({ status });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: "Failed to delete chat" });
    }
  }
})();
