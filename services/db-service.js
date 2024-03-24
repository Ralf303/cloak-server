import sequelize from "../db/config.js";
import { Op } from "sequelize";
import { Chats, Message } from "../db/models/chats-model.js";
import User from "../db/models/user-model.js";

export default new (class dbService {
  async connect() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      await sequelize.sync();
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  async getChatsOnId(userId) {
    const chats = await Chats.findAll({
      where: sequelize.and(
        sequelize.or({ userOne: userId }, { userTwo: userId }),
        { messageCounter: { [Op.gt]: 0 } }
      ),
    });

    return chats;
  }

  async changeUserPrivate(obj) {
    try {
      const { status, nick } = obj;

      const user = await this.getUser(nick);
      user.isPrivate = status;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChat(userOne, userTwo) {
    try {
      const user1 = await this.getUser(userOne);
      const user2 = await this.getUser(userTwo);
      const chat = await Chats.findOne({
        where: sequelize.or(
          { userOne: user1.id, userTwo: user2.id },
          { userOne: user2.id, userTwo: user1.id }
        ),
      });
      if (chat) {
        await chat.destroy();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteMessages(user) {
    try {
      const user1 = await this.getUser(user);
      const chat = await Chats.findOne({
        where: { userOne: user1.id, userTwo: user1.id },
      });
      if (chat) {
        await Message.destroy({ where: { chatId: chat.id } });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getMessages(userOne, userTwo) {
    try {
      if (userOne === "Избранное") {
        userOne = userTwo;
      }
      const user1 = await this.getUser(userOne);
      const user2 = await this.getUser(userTwo);

      const chat = await Chats.findOne({
        where: sequelize.or(
          { userOne: user1.id, userTwo: user2.id },
          { userOne: user2.id, userTwo: user1.id }
        ),
      });

      if (chat) {
        const messages = await Message.findAll({ where: { chatId: chat.id } });
        return messages;
      } else {
        return "Chat not found";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getChatOnUsernames(user1, user2) {
    try {
      const userOne = await this.getUser(user1);
      const userTwo = await this.getUser(user2);

      const chat = await Chats.findOne({
        where: sequelize.or(
          sequelize.and({ userOne: userOne.id }, { userTwo: userTwo.id }),
          sequelize.and({ userOne: userTwo.id }, { userTwo: userOne.id })
        ),
      });

      return chat;
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(sender, receiver, text, data) {
    try {
      const message = await Message.create({
        sender: sender,
        receiver: receiver,
        text: text,
        data: data,
      });

      return message;
    } catch (error) {
      console.log(error);
    }
  }

  async createChat(userOne, userTwo) {
    try {
      const isUserTwo = await this.getUser(userTwo);

      if (!isUserTwo) {
        return "Такого юзера несуществует";
      }

      if (isUserTwo.isPrivate) {
        return "У юзера закрытый профиль, вы не можете ему написать первым.";
      }

      const checkChat = await this.getChatOnUsernames(userOne, isUserTwo.id);

      if (checkChat) {
        return { chat: checkChat, userTwo: isUserTwo.username };
      } else {
        const newChat = await Chats.create({
          userOne: userOne,
          userTwo: isUserTwo.id,
        });
        return { chat: newChat, userTwo: isUserTwo.username };
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(userIdOrUsername) {
    try {
      let user;
      if (typeof userIdOrUsername === "string") {
        user = await User.findOne({ where: { username: userIdOrUsername } });
      } else if (typeof userIdOrUsername === "number") {
        user = await User.findOne({ where: { id: userIdOrUsername } });
      }
      return user;
    } catch (e) {
      console.log(e);
    }
  }
})();
