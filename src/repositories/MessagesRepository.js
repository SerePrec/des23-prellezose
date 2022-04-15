import BaseRepository from "./BaseRepository.js";
import { messagesDAO } from "../model/index.js";
import { MessageDTO } from "../model/DTOs/MessageDTO.js";
import { MessageWithId } from "../model/entities/Message.js";

export default class ProductsRepository extends BaseRepository {
  constructor() {
    super(MessageWithId, messagesDAO, MessageDTO);
  }
}
