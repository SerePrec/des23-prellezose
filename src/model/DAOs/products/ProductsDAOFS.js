import BaseDAOFS from "../../BaseDAOs/BaseDAOFS.js";
import { ProductDTO } from "../../DTOs/ProductDTO.js";
import config from "../../../config.js";

class ProductsDAOFS extends BaseDAOFS {
  static #instance;

  constructor() {
    if (ProductsDAOFS.#instance) {
      return ProductsDAOFS.#instance;
    }
    super(config.fileSystemDb.productsFile, ProductDTO);
    ProductsDAOFS.#instance = this;
  }
}

export default ProductsDAOFS;
