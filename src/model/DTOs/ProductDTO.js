class ProductDTO {
  constructor(data) {
    this.title = data.title;
    this.price = data.price;
    this.thumbnail = data.thumbnail;
    data.id || data._id ? (this.id = data.id || data._id.toString()) : null;
    data.timestamp
      ? (this.timestamp =
          typeof data.timestamp === "object"
            ? data.timestamp.toISOString()
            : data.timestamp.toString())
      : null;
  }
}

export { ProductDTO };
