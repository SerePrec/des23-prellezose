import BaseDAOMongoDB from "../../BaseDAOs/BaseDAOMongoDB.js";
import { messageSchema } from "../../schemas/mongoDBSchemas.js";
import { MessageDTO } from "../../DTOs/MessageDTO.js";

class MessagesDAOMongoDB extends BaseDAOMongoDB {
  static #instance;

  constructor() {
    if (MessagesDAOMongoDB.#instance) {
      return MessagesDAOMongoDB.#instance;
    }
    super("Message", messageSchema, MessageDTO);
    MessagesDAOMongoDB.#instance = this;
  }
}

export default MessagesDAOMongoDB;
