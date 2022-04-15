import faker from "faker";
faker.locale = "es";

export const get = () => ({
  title: faker.commerce.product(),
  price: faker.commerce.price(),
  thumbnail: faker.image.imageUrl(100, 100, "any", true)
});
