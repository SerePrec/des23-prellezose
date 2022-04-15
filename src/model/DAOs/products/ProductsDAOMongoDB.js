import BaseDAOMongoDB from "../../BaseDAOs/BaseDAOMongoDB.js";
import { productSchema } from "../../schemas/mongoDBSchemas.js";
import { ProductDTO } from "../../DTOs/ProductDTO.js";

class ProductsDAOMongoDB extends BaseDAOMongoDB {
  static #instance;

  constructor() {
    if (ProductsDAOMongoDB.#instance) {
      return ProductsDAOMongoDB.#instance;
    }
    super("Product", productSchema, ProductDTO);
    ProductsDAOMongoDB.#instance = this;
  }
}

export default ProductsDAOMongoDB;
