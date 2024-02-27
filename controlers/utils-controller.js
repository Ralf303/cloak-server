import dbService from "../services/db-service.js";

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
})();
