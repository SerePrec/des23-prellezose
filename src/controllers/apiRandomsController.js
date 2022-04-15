import RandomsService from "../services/randomsService.js";
import { logger } from "../logger/index.js";

const ACTIVE_RANDOMS_CHILD_PROCESS = true;

class ApiRandomsController {
  constructor() {
    this.randomsService = new RandomsService();
  }
  getRandoms = async ({ cant = 1e8 }) => {
    if (ACTIVE_RANDOMS_CHILD_PROCESS) {
      try {
        const result = await this.randomsService.getRandoms(cant);
        return result;
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      logger.warn(`API randoms no activa!`);
      throw new Error("API randoms no activa");
    }
  };
}

export default ApiRandomsController;
