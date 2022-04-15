import ProductsService from "./services/productosService.js";
import MessagesService from "./services/messagesService.js";
import ValidateDataService from "./services/validateDataService.js";
import { logger } from "./logger/index.js";

const productsService = new ProductsService();
const messagesService = new MessagesService();
const validateDataService = new ValidateDataService();

//Configuración de sockets
export default io => {
  io.on("connection", async socket => {
    const socketId = socket.id;
    //let now = new Date().toLocaleTimeString();
    logger.debug(
      `Cliente socket conectado con id: ${socketId}\n** Conexiones websocket activas: ${io.engine.clientsCount} **`
    );

    //Obtiene listado de productos con cada conexión entrante y lo envía al socket
    try {
      const list = await productsService.getAllProducts();
      socket.emit("allProducts", list);
    } catch (error) {
      logger.error(error);
      socket.emit("productErrors", "No se pudo recuperar archivo de productos");
    }

    // Envio a todos los sockets la cantidad de usuarios conectados con cada conexión
    //   io.sockets.emit("usersCount", io.engine.clientsCount);

    //Obtiene listado de mensajes con cada conexión entrante y lo envía al socket
    try {
      const normalizedMessages = await messagesService.getAllMessages();
      socket.emit("allMessages", normalizedMessages);
    } catch (error) {
      logger.error(error);
      socket.emit("messageErrors", "No se pudo recuperar archivo de mensajes");
    }

    //Escucha el evento de guardar un nuevo producto
    socket.on("saveProduct", async product => {
      try {
        const newProduct = validateDataService.validatePostProductBody(product);
        if (newProduct && !newProduct.error) {
          await productsService.createProduct(newProduct);
          const list = await productsService.getAllProducts();
          io.sockets.emit("allProducts", list);
        } else {
          socket.emit("productErrors", "Los valores enviados no son válidos");
        }
      } catch (error) {
        logger.error(error);
        socket.emit("productErrors", "No se pudo agregar el producto");
      }
    });

    //Escucha el evento de un nuevo mensaje enviado
    socket.on("newMessage", async message => {
      try {
        const newMessage = validateDataService.validateMessage(message);
        if (newMessage && !newMessage.error) {
          await messagesService.createMessage(message);
          const normalizedMessages = await messagesService.getAllMessages();
          io.sockets.emit("allMessages", normalizedMessages);
        } else {
          socket.emit("messageErrors", "Los valores enviados no son válidos");
        }
      } catch (error) {
        logger.error(error);
        socket.emit("messageErrors", "Error al procesar el mensaje enviado");
      }
    });

    // Actualizo la cantidad de usuarios conectados con cada desconexión y la mustro por consola.
    socket.on("disconnect", () => {
      //now = new Date().toLocaleTimeString();
      logger.debug(
        `** Conexiones websocket activas: ${io.engine.clientsCount} **`
      );
      //io.sockets.emit("usersCount", io.engine.clientsCount);
    });
  });

  //Cambié a esta forma de actualizar los usuarios conectados para ser compatible con el modo cluster. Así cada x seg cada servidro worker envía los usuarios que tiene conectados y en el front se procesa el conjunto de infomación
  setInterval(() => {
    io.sockets.emit("usersCount", io.engine.clientsCount);
  }, 3000);
};
