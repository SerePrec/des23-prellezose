import Joi from "joi";
import { logger } from "../../logger/index.js";

export class Product {
  _title;
  _price;
  _thumbnail;

  static thumbnailPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  constructor({ title, price, thumbnail }) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  static validate(product, requerido) {
    const ProductSchema = Joi.object({
      title: requerido ? Joi.string().trim().required() : Joi.string().trim(),
      price: requerido
        ? Joi.number().positive().precision(2).required()
        : Joi.number().positive().precision(2),
      thumbnail: requerido
        ? Joi.string().pattern(Product.thumbnailPattern).trim().required()
        : Joi.string().pattern(Product.thumbnailPattern).trim()
    });
    const { error, value } = ProductSchema.validate(product);
    if (error) {
      logger.error(`Error de validación: ${error.message}`);
      return false;
    }
    return value;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    const { error, value } = Joi.string().trim().required().validate(title);
    if (error) {
      throw new Error(`title: ${error.message}`);
    }
    this._title = value;
  }

  get price() {
    return this._price;
  }

  set price(price) {
    const { error, value } = Joi.number()
      .positive()
      .precision(2)
      .required()
      .validate(price);
    if (error) {
      throw new Error(`price: ${error.message}`);
    }
    this._price = value;
  }

  get thumbnail() {
    return this._thumbnail;
  }

  set thumbnail(thumbnail) {
    const { error, value } = Joi.string()
      .pattern(Product.thumbnailPattern)
      .trim()
      .required()
      .validate(thumbnail);
    if (error) {
      throw new Error(`thumbnail: ${error.message}`);
    }
    this._thumbnail = value;
  }
}

export class ProductWithId extends Product {
  _id;
  _timestamp;
  constructor({ id, title, price, thumbnail, timestamp }) {
    super({ title, price, thumbnail });
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
