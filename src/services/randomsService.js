import { fork } from "child_process";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { logger } from "../logger/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

class RandomsService {
  getRandoms = async cant => {
    return new Promise((resolve, reject) => {
      if (Number(cant)) {
        const child = fork(
          path.join(__dirname, "..", "childProcesses", "calcRandomNumbers.js")
        );

        child.on("message", msg => {
          //handshake
          if (msg === "ready")
            child.send({
              action: "start",
              payload: { min: 1, max: 1000, qty: Number(cant) }
            });
          else resolve(msg);
        });
        child.on("error", error => {
          logger.error(
            `Error en Child process 'calcRandomNumbers' con pid:${child.pid}:\n${error}`
          );
          reject({ status: 500, message: "error interno del servidor" });
        });
        child.on("close", code => {
          logger.info(
            `Child process 'calcRandomNumbers' con pid:${child.pid} terminado con código ${code}`
          );
          if (code !== 0)
            reject({ status: 500, message: "error interno del servidor" });
        });
      } else reject({ status: 400, message: "valor de parámetro inválido" });
    });
  };
}

export default RandomsService;
