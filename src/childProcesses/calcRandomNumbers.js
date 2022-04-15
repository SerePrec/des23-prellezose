import { logger } from "../logger/index.js";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomNumbers(min, max, qty) {
  const randoms = {};
  for (let i = 0; i < parseInt(qty); i++) {
    const number = getRandomNumber(min, max);
    randoms[number] ? randoms[number]++ : (randoms[number] = 1);
  }
  return randoms;
}

function arrayFormat(dic) {
  const randoms = [];
  for (const [number, occurrency] of Object.entries(dic)) {
    randoms.push({ number, occurrency });
  }
  return randoms;
}

logger.info(
  `Child Process 'calcRandomNumbers' iniciado con pid:${process.pid}`
);

process.on("message", msg => {
  const { action, payload } = msg;
  if (action === "start") {
    const { min, max, qty } = payload;
    const result = getRandomNumbers(min, max, qty);
    process.send(arrayFormat(result));
    process.exit();
  }
});
//Handshake
process.send("ready");
