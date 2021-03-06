import { logger } from "../../logger/index.js";

class BaseDAOMem {
  constructor(DTO) {
    this.elements = [];
    this.nextId = 1;
    this.DTO = DTO;
  }

  //No tiene funcionalidad pero es para mantener las mismas interfaces
  init() {}

  //Obtengo todos los elementos
  getAll() {
    try {
      return this.elements.map(element => new this.DTO(element));
    } catch (error) {
      throw new Error(`No se pudo recuperar los datos: ${error}`);
    }
  }

  //Obtengo un elemento por su id
  getById(id) {
    try {
      id = parseInt(id);
      const match = this.elements.find(elem => elem.id === id);
      return match ? new this.DTO(match) : null;
    } catch (error) {
      throw new Error(`Error al obtener el elemento con id '${id}': ${error}`);
    }
  }

  //Guardo el elemento
  save(data) {
    try {
      const id = this.nextId;
      const timestamp = new Date().toISOString();
      const element = { ...data, id, timestamp };
      this.elements.push(element);
      this.nextId++;
      logger.debug("Elemento guardado con éxito");
      return new this.DTO(element);
    } catch (error) {
      throw new Error(`Error al guardar el elemento: ${error}`);
    }
  }

  //actualizo un elemento por su id
  updateById(id, data) {
    try {
      id = parseInt(id);
      const match = this.elements.find(elem => elem.id === id);
      if (match) {
        for (const key in data) {
          if (!data[key]) data[key] = match[key];
        }
        const newElement = { ...match, ...data };
        const newContent = this.elements.map(elem =>
          elem.id !== id ? elem : newElement
        );
        this.elements = newContent;
        logger.debug(`El elemento con id: ${id} se actualizó con éxito`);
        return new this.DTO(newElement);
      } else {
        logger.debug(`No se encontró el elemento con el id: ${id}`);
        return null;
      }
    } catch (error) {
      throw new Error(
        `Error al actualizar el elemento con id '${id}': ${error}`
      );
    }
  }

  //borro todos los elementos
  deleteAll() {
    try {
      this.elements = [];
    } catch (error) {
      throw new Error(`Error al borrar todos los elementos: ${error}`);
    }
  }

  //borro un elemento por su id
  deleteById(id) {
    try {
      id = parseInt(id);
      const match = this.elements.find(elem => elem.id === id);
      if (match) {
        const newContent = this.elements.filter(elem => elem.id !== id);
        this.elements = newContent;
        logger.debug(`El elemento con id: ${id} se eliminó con éxito`);
        return id;
      } else {
        logger.debug(`No se encontró el elemento con el id: ${id}`);
        return null;
      }
    } catch (error) {
      throw new Error(`Error al borrar el elemento con id '${id}': ${error}`);
    }
  }
}

export default BaseDAOMem;
