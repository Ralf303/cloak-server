import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const bearerToken = req.headers.token;

    if (!bearerToken) {
      return res.status(403).json({ message: "Юзер не зарегистрирован" });
    }
    const token = bearerToken.split(" ")[1];
    const decodeData = jwt.verify(token, process.env.KEY);
    req.user = decodeData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Юзер не зарегистрирован" });
  }
}
