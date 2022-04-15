class ProductsFactoryDAO {
  static async get(PERS) {
    switch (PERS) {
      case "file": {
        const { default: ProductsDAOFS } = await import("./ProductsDAOFS.js");
        return new ProductsDAOFS();
      }
      case "mongodb":
      case "mongodb_atlas": {
        const { default: ProductsDAOMongoDB } = await import(
          "./ProductsDAOMongoDB.js"
        );
        return new ProductsDAOMongoDB();
      }
      case "mem":
      default: {
        const { default: ProductsDAOMem } = await import("./ProductsDAOMem.js");
        return new ProductsDAOMem();
      }
    }
  }
}

export default ProductsFactoryDAO;
