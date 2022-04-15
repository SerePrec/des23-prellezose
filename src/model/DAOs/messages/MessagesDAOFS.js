import BaseDAOFS from "../../BaseDAOs/BaseDAOFS.js";
import { MessageDTO } from "../../DTOs/MessageDTO.js";
import config from "../../../config.js";

class MessagesDAOFS extends BaseDAOFS {
  static #instance;

  constructor() {
    if (MessagesDAOFS.#instance) {
      return MessagesDAOFS.#instance;
    }
    super(config.fileSystemDb.messagesFile, MessageDTO);
    MessagesDAOFS.#instance = this;
  }
}

export default MessagesDAOFS;
