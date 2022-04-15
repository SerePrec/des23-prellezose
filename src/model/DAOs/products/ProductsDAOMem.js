import BaseDAOMem from "../../BaseDAOs/BaseDAOMem.js";
import { ProductDTO } from "../../DTOs/ProductDTO.js";

class ProductsDAOMem extends BaseDAOMem {
  static #instance;

  constructor() {
    if (ProductsDAOMem.#instance) {
      return ProductsDAOMem.#instance;
    }
    super(ProductDTO);
    ProductsDAOMem.#instance = this;
  }
}

export default ProductsDAOMem;
