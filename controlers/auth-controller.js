import User from "../db/user-model.js";
import bcrypt from "bcryptjs";
import jwtService from "../services/jwt-service.js";

export default new (class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body.data;
      const candidate = await User.findOne({ where: { username: username } });

      if (candidate) {
        return res.status(200).json({ message: "Данный ник уже занят" });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const user = await User.create({
        username: username,
        password: hashPassword,
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
        return res.status(200).json({ status: true });
      } else {
        return res.status(200).json({ status: false });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: false });
    }
  }
})();
