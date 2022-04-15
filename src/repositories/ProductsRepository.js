import BaseRepository from "./BaseRepository.js";
import { productsDAO } from "../model/index.js";
import { ProductDTO } from "../model/DTOs/ProductDTO.js";
import { ProductWithId } from "../model/entities/Product.js";

export default class ProductsRepository extends BaseRepository {
  constructor() {
    super(ProductWithId, productsDAO, ProductDTO);
  }
}
