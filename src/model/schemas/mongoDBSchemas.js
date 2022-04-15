import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  author: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  thumbnail: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export { messageSchema, productSchema, userSchema };
