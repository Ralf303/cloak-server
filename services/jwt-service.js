import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});

export default new (class JwtService {
  generateToken(id) {
    const payload = {
      id,
    };

    return jwt.sign(payload, process.env.KEY, { expiresIn: "72h" });
  }
})();
