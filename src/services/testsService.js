import faker from "faker";
faker.locale = "es";

class TestsService {
  generateMockProduct(id) {
    const product = {
      id,
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(100, 100, "any", true),
      timestamp: faker.date.past()
    };
    return product;
  }

  generateNMockProduct(n) {
    const mockProductos = [];
    for (let i = 1; i <= n; i++) {
      mockProductos.push(this.generateMockProduct(i));
    }
    return mockProductos;
  }
}

export default TestsService;
