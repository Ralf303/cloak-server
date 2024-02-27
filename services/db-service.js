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

  async getMessages(userOne, userTwo) {
    try {
      if (userOne === "Избранное") {
        userOne = userTwo;
      }
      const user1 = await this.getUser(userOne);
      const user2 = await this.getUser(userTwo);

      // Находим чат между указанными пользователями
      const chat = await Chats.findOne({
        where: sequelize.or(
          { userOne: user1.id, userTwo: user2.id },
          { userOne: user2.id, userTwo: user1.id }
        ),
      });

      if (chat) {
        // Находим все сообщения в этом чате
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
      const userOneName = await this.getUser(user1);
      const userTwoName = await this.getUser(user2);

      const chat = await Chats.findOne({
        where: sequelize.or(
          sequelize.and(
            { userOne: userOneName.id },
            { userTwo: userTwoName.id }
          ),
          sequelize.and(
            { userOne: userTwoName.id },
            { userTwo: userOneName.id }
          )
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
      const isUserTwo = await User.findOne({ where: { username: userTwo } });

      if (isUserTwo) {
        const checkChat = await Chats.findOne({
          where: sequelize.or(
            { userOne: userOne, userTwo: isUserTwo.id },
            { userOne: isUserTwo.id, userTwo: userOne }
          ),
        });

        if (checkChat) {
          return { chat: checkChat, userTwo: isUserTwo.username };
        } else {
          const newChat = await Chats.create({
            userOne: userOne,
            userTwo: isUserTwo.id,
          });
          return { chat: newChat, userTwo: isUserTwo.username };
        }
      } else {
        return "Такого юзера несуществует";
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
