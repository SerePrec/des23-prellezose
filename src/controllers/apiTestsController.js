import TestsService from "../services/testsService.js";
import { logger } from "../logger/index.js";

class ApiTestsController {
  constructor() {
    this.testsService = new TestsService();
  }

  getProductosTest = () => {
    try {
      return this.testsService.generateNMockProduct(5);
    } catch (error) {
      logger.error(error);
      throw new Error(`Error al obtener productos mock`);
    }
  };
}

export default ApiTestsController;
