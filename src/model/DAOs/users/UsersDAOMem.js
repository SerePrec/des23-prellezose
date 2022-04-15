import BaseDAOMem from "../../BaseDAOs/BaseDAOMem.js";
import { UserDTO } from "../../DTOs/UserDTO.js";

class UsersDAOMem extends BaseDAOMem {
  static #instance;

  constructor() {
    if (UsersDAOMem.#instance) {
      return UsersDAOMem.#instance;
    }
    super(UserDTO);
    UsersDAOMem.#instance = this;
  }

  getByUsername(username) {
    const match = this.elements.find(user => user.username === username);
    return match ? new this.DTO(match) : null;
  }
}

export default UsersDAOMem;
