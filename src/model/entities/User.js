import Joi from "joi";
import { logger } from "../../logger/index.js";

export class User {
  _username;
  _password;
  static usernamePattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }

  static validate(user, requerido) {
    const UserSchema = Joi.object({
      username: requerido
        ? Joi.string().pattern(User.usernamePattern).trim().required()
        : Joi.string().pattern(User.usernamePattern).trim(),
      password: requerido ? Joi.string().min(6).required() : Joi.string().min(6)
    });
    const { error, value } = UserSchema.validate(user);
    if (error) {
      logger.error(`Error de validación: ${error.message}`);
      return false;
    }
    return value;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    const { error, value } = Joi.string()
      .pattern(User.usernamePattern)
      .trim()
      .required()
      .validate(username);
    if (error) {
      throw new Error(`username: ${error.message}`);
    }
    this._username = value;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    const { error, value } = Joi.string().min(6).required().validate(password);
    if (error) {
      throw new Error(`password: ${error.message}`);
    }
    this._password = value;
  }
}

export class UserWithId extends User {
  _id;
  _timestamp;
  constructor({ id, username, password, timestamp }) {
    super({ username, password });
    this.id = id;
    this.timestamp = timestamp;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    const { error, value } = Joi.required().validate(id);
    if (error) {
      throw new Error(`id: ${error.message}`);
    }
    this._id = value;
  }

  get timestamp() {
    return this._timestamp;
  }

  set timestamp(timestamp) {
    const { error, value } = Joi.string()
      .isoDate()
      .required()
      .validate(timestamp);
    if (error) {
      throw new Error(`timestamp: ${error.message}`);
    }
    this._timestamp = value;
  }
}
