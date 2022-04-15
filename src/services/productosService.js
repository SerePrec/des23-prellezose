import ProductsRepository from "../repositories/ProductsRepository.js";
import { Product } from "../model/entities/Product.js";
import { ProductDTO } from "../model/DTOs/ProductDTO.js";
import ValidateDataService from "./validateDataService.js";

const validateDataService = new ValidateDataService();

class ProductosService {
  constructor() {
    this.productsModel = new ProductsRepository();
  }

  getAllProducts = async () => {
    const productEntities = await this.productsModel.getAll();
    const products = productEntities.map(product => new ProductDTO(product));
    return products;
  };

  createProduct = async newProductData => {
    const validatedData =
      validateDataService.validatePostProductBody(newProductData);
    if (validatedData && validatedData.error)
      throw new Error(validatedData.error);

    const newProductEntitie = new Product(validatedData);
    const createdProductEntitie = await this.productsModel.save(
      newProductEntitie
    );
    return new ProductDTO(createdProductEntitie);
  };

  getProduct = async id => {
    const validated = validateDataService.validateId(id);
    if (validated && validated.error) throw new Error(validated.error);

    const productEntitie = await this.productsModel.getById(id);
    return productEntitie ? new ProductDTO(productEntitie) : productEntitie;
  };

  updateProduct = async (id, updateData) => {
    const validated = validateDataService.validateId(id);
    if (validated && validated.error) throw new Error(validated.error);
    const validatedData =
      validateDataService.validatePutProductBody(updateData);
    if (validatedData && validatedData.error)
      throw new Error(validatedData.error);

    const updatedProductEntitie = await this.productsModel.updateById(
      id,
      validatedData
    );
    return updatedProductEntitie
      ? new ProductDTO(updatedProductEntitie)
      : updatedProductEntitie;
  };

  deleteProduct = async id => {
    const validated = validateDataService.validateId(id);
    if (validated && validated.error) throw new Error(validated.error);

    const deletedId = await this.productsModel.deleteById(id);
    return deletedId;
  };
}

export default ProductosService;
