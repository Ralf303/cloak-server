import sequelize from "../db/config.js";

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
})();
