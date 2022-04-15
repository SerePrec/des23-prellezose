import ProductsService from "../services/productosService.js";
import { logger } from "../logger/index.js";

class ApiProductosController {
  constructor() {
    this.productsService = new ProductsService();
  }

  getAllProducts = async () => {
    try {
      const lista = await this.productsService.getAllProducts();
      return lista;
    } catch (error) {
      logger.error(error);
      throw new Error(`No se pudo recuperar la infomación: ${error}`);
    }
  };

  createProduct = async ({ data }) => {
    try {
      const newProduct = await this.productsService.createProduct(data);
      logger.info("Producto creado con éxito");
      return newProduct;
    } catch (error) {
      logger.error(error);
      throw new Error(`No se pudo agregar el producto: ${error}`);
    }
  };

  getProduct = async ({ id }) => {
    try {
      const producto = await this.productsService.getProduct(id);
      if (producto !== null) {
        return producto;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      logger.error(error);
      throw new Error(`No se pudo recuperar la infomación: ${error}`);
    }
  };

  updateProduct = async ({ id, data }) => {
    try {
      const updateProduct = await this.productsService.updateProduct(id, data);
      if (updateProduct !== null) {
        logger.info("Producto actualizado con éxito");
        return updateProduct;
      } else {
        logger.warn("Producto no encontrado");
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      logger.error(error);
      throw new Error(`No se pudo actualizar el producto: ${error}`);
    }
  };

  deleteProduct = async ({ id }) => {
    try {
      const deletedId = await this.productsService.deleteProduct(id);
      if (deletedId !== null) {
        logger.info("Producto borrado con éxito");
        return deletedId;
      } else {
        logger.warn("Producto no encontrado");
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      logger.error(error);
      throw new Error(`No se pudo eliminar el producto: ${error}`);
    }
  };
}

export default ApiProductosController;
