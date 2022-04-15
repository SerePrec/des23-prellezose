import BaseDAOMem from "../../BaseDAOs/BaseDAOMem.js";
import { MessageDTO } from "../../DTOs/MessageDTO.js";

class MessagesDAOMem extends BaseDAOMem {
  static #instance;

  constructor() {
    if (MessagesDAOMem.#instance) {
      return MessagesDAOMem.#instance;
    }
    super(MessageDTO);
    MessagesDAOMem.#instance = this;
  }
}

export default MessagesDAOMem;
