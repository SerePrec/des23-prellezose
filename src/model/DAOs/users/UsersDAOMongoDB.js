import BaseDAOMongoDB from "../../BaseDAOs/BaseDAOMongoDB.js";
import { userSchema } from "../../schemas/mongoDBSchemas.js";
import { UserDTO } from "../../DTOs/UserDTO.js";

class UsersDAOMongoDB extends BaseDAOMongoDB {
  static #instance;

  constructor() {
    if (UsersDAOMongoDB.#instance) {
      return UsersDAOMongoDB.#instance;
    }
    super("User", userSchema, UserDTO);
    UsersDAOMongoDB.#instance = this;
  }

  async getByUsername(username) {
    try {
      let element = await this.CollModel.findOne({ username }, { __v: 0 });
      return element ? new this.DTO(element) : null;
    } catch (error) {
      throw new Error(
        `Error al obtener el usuario con username: '${username}': ${error}`
      );
    }
  }
}

export default UsersDAOMongoDB;
