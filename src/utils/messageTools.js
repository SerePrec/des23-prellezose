import { normalize, schema } from "normalizr";

export const escapeHtml = unsafe =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// NORMALIZACIÓN DE MENSAJES
const userSchema = new schema.Entity("users", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity("messages", {
  author: userSchema
});
// Esquema para normalizar un array de esquemas (mensajes)
// No es necesario generar un objeto con id arbitrario para contener
// este array como una propiedad
const messageListSchema = [messageSchema];

export const normalizeMessages = messages =>
  normalize(messages, messageListSchema);
