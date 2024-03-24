import User from "../db/models/user-model.js";
import dbService from "../services/db-service.js";
import bcrypt from "bcryptjs";

export default new (class utilControler {
  async getUser(req, res) {
    try {
      const { id } = req.query;
      const user = await dbService.getUser(Number(id));

      return res.status(200).json({ user: user });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  }

  async checkPrivate(req, res) {
    try {
      const { username } = req.query;
      const user = await dbService.getUser(username);
      return res.status(200).json({ isPrivate: user.isPrivate });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  }

  async changePass(req, res) {
    try {
      const { id } = req.user;
      const { password, oldPassword } = req.body.data;

      const user = await User.findOne({ where: id });
      const checkPass = bcrypt.compareSync(oldPassword, user.password);

      if (!checkPass) {
        return res
          .status(200)
          .json({ message: "Неверный пароль", status: false });
      }

      if (user) {
        const hashPassword = bcrypt.hashSync(password, 5);
        user.password = hashPassword;
        await user.save();
        return res.status(200).json({ status: true });
      } else {
        return res.status(200).json({ status: false });
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: e });
    }
  }
})();
