class MessageDTO {
  constructor(data) {
    this.author = data.author;
    this.text = data.text;
    data.id || data._id ? (this.id = data.id || data._id.toString()) : null;
    data.timestamp
      ? (this.timestamp =
          typeof data.timestamp === "object"
            ? data.timestamp.toISOString()
            : data.timestamp.toString())
      : null;
  }
}

export { MessageDTO };
