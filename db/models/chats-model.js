import sequelize from "../config.js";
import { DataTypes } from "sequelize";

const Chats = sequelize.define("chats", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  userOne: { type: DataTypes.INTEGER },
  userTwo: { type: DataTypes.INTEGER },
  messageCounter: { type: DataTypes.INTEGER },
});

const Message = sequelize.define("message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  sender: { type: DataTypes.STRING },
  receiver: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  data: { type: DataTypes.STRING },
});

Chats.hasMany(Message, { as: "messages" });
Message.belongsTo(Chats);

export { Chats, Message };
