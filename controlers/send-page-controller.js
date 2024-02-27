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

  async seedPhrase(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "cloak-client", "html", "secret.html")
    );
  }

  async sendChats(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "cloak-client", "html", "chats.html")
    );
  }

  async sendReset(req, res) {
    res.sendFile(
      path.join(
        __dirname,
        "..",
        "..",
        "cloak-client",
        "html",
        "resetPassword.html"
      )
    );
  }

  async sendNewPass(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "cloak-client", "html", "newPass.html")
    );
  }

  async sendSettings(req, res) {
    res.sendFile(
      path.join(__dirname, "..", "..", "cloak-client", "html", "settings.html")
    );
  }
}
export default new PageController();
