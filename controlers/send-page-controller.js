import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PageController {
  async sendChat(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "cloak-client", "html", "chat.html")
    );
  }

  async sendRegistration(req, res) {
    res.sendFile(
      path.join(
        __dirname,
        "..",
        "..",
        "cloak-client",
        "html",
        "registration.html"
      )
    );
  }

  async sendAuthorization(req, res) {
    res.sendFile(
      path.join(
        __dirname,
        "..",
        "..",
        "cloak-client",
        "html",
        "authorization.html"
      )
    );
  }

  async sendTest(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "cloak-client", "html", "test.html")
    );
  }
}
export default new PageController();
