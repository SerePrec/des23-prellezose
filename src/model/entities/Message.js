import Joi from "joi";
import { logger } from "../../logger/index.js";

export class Message {
  _text;
  _author;

  constructor({ text, author }) {
    this.text = text;
    this.author = author;
  }

  static validate(message, requerido) {
    const AuthorSchema = Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      age: Joi.number().integer().positive().required(),
      alias: Joi.string().trim().required(),
      avatar: Joi.string().trim().required()
    });
    const MessageSchema = Joi.object({
      text: requerido ? Joi.string().trim().required() : Joi.string(),
      author: requerido ? AuthorSchema.required() : AuthorSchema
    });
    const { error, value } = MessageSchema.validate(message);
    if (error) {
      logger.error(`Error de validación: ${error.message}`);
      return false;
    }
    return value;
  }

  get text() {
    return this._text;
  }

  set text(text) {
    const { error, value } = Joi.string().trim().required().validate(text);
    if (error) {
      throw new Error(`text: ${error.message}`);
    }
    this._text = value;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    const AuthorSchema = Joi.object({
      email: Joi.string().email().required(),
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      age: Joi.number().integer().positive().required(),
      alias: Joi.string().trim().required(),
      avatar: Joi.string().trim().required()
    });

    const { error, value } = AuthorSchema.validate(author);
    if (error) {
      throw new Error(`author: ${error.message}`);
    }
    this._author = value;
  }
}

export class MessageWithId extends Message {
  _id;
  _timestamp;
  constructor({ id, text, author, timestamp }) {
    super({ text, author });
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
