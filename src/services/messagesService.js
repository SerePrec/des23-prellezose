import MessagesRepository from "../repositories/MessagesRepository.js";
import { Message } from "../model/entities/Message.js";
import { MessageDTO } from "../model/DTOs/MessageDTO.js";
import { escapeHtml, normalizeMessages } from "../utils/messageTools.js";

class MessagesService {
  constructor() {
    this.messagesModel = new MessagesRepository();
  }

  getAllMessages = async () => {
    const messageEntities = await this.messagesModel.getAll();
    const messages = messageEntities.map(message => new MessageDTO(message));
    const normalizedMessages = normalizeMessages(messages);
    return normalizedMessages;
  };

  createMessage = async message => {
    message.text = escapeHtml(message.text);
    const newMessageEntitie = new Message(message);
    const createdMessageEntitie = await this.messagesModel.save(
      newMessageEntitie
    );
    return new MessageDTO(createdMessageEntitie);
  };
}

export default MessagesService;
