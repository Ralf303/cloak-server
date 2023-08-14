import {fileURLToPath} from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ChatGetController {
    
    async sendChat(req, res) {
        res.sendFile(path.join(__dirname, "..", "..", "..", "cloak-client", "html", "chat.html"));
    }

  }
  
  export default new ChatGetController();