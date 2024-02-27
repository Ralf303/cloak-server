import { generate } from "random-words";
import bcrypt from "bcryptjs";
import jwtService from "../services/jwt-service.js";
import User from "../db/models/user-model.js";

export default new (class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body.data;
      const candidate = await User.findOne({ where: { username: username } });

      if (candidate) {
        return res.status(200).json({ message: "Данный ник уже занят" });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const words = generate({
        exactly: 20,
        minLength: 4,
        maxLength: 5,
        join: " ",
      });
      const user = await User.create({
        username: username,
        password: hashPassword,
        words: words,
      });
      await user.save();
      return res.status(200).json({ message: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body.data;

      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return res.status(200).json({ message: "Такого ник нейма нет" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res
          .status(200)
          .json({ message: "Не правильный ник или пароль" });
      }

      const token = jwtService.generateToken(user.id);
      return res.status(200).json({ message: true, token: token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Login error" });
    }
  }

  async check(req, res) {
    try {
      const { id } = req.user;
      const user = await User.findOne({ where: id });

      if (user) {
        return res.status(200).json({ status: user });
      } else {
        return res.status(200).json({ status: false });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: false });
    }
  }

  async getWords(req, res) {
    try {
      const { nick } = req.query;
      const user = await User.findOne({ where: { username: nick } });

      res.status(200).json({ words: user.words });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  async resetPassword(req, res) {
    try {
      const { words } = req.body.data;

      const user = await User.findOne({
        where: { words: `${words.join(" ")}` },
      });

      if (user) {
        res.status(200).json({ message: "Слова совпали", user_id: user.id });
      } else {
        res.status(200).json({ message: "Неверные слова" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  async updatePass(req, res) {
    try {
      const { id, password } = req.body.data;

      const user = await User.findOne({
        where: { id: id },
      });

      if (user) {
        const hashPassword = bcrypt.hashSync(password, 5);
        user.password = hashPassword;
        await user.save();
        res.status(200).json({ message: true });
      } else {
        res.status(200).json({ message: false });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
})();
