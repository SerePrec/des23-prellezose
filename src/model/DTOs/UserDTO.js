class UserDTO {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    data.id || data._id ? (this.id = data.id || data._id.toString()) : null;
    data.timestamp
      ? (this.timestamp =
          typeof data.timestamp === "object"
            ? data.timestamp.toISOString()
            : data.timestamp.toString())
      : null;
  }
}

export { UserDTO };
