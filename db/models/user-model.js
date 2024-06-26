import sequelize from "../config.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  words: { type: DataTypes.STRING },
  isPrivate: { type: DataTypes.BOOLEAN, defaultValue: false },
});

export default User;
