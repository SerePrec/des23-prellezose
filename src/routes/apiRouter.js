import Router from "koa-router";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "koa-graphql";
import ApiProductosController from "../controllers/apiProductosController.js";
import ApiTestsController from "../controllers/apiTestsController.js";
import ApiRandomsController from "../controllers/apiRandomsController.js";
import Error404Controller from "../controllers/error404Controller.js";
import config from "../config.js";

const router = new Router({ prefix: "/api" });

class ApiRouter {
  constructor() {
    this.apiProductosController = new ApiProductosController();
    this.apiTestsController = new ApiTestsController();
    this.randomsController = new ApiRandomsController();
    this.error404Controller = new Error404Controller();
  }

  start() {
    // GraphQL schema
    const schema = buildSchema(`
      type Query {
        products: [Product!]!
        product(id:ID!): Product!
        productsMock: [Product!]!
        randoms(cant: Int): [RandomPair!]!
      }
      type Mutation {
        createProduct(data: ProductCreateInput!): Product!
        updateProduct(id:ID!, data: ProductUpdateInput!): Product!
        deleteProduct(id: ID!): ID!
      }
      type Product {
        id: ID!
        title: String!
        price: Float!
        thumbnail: String!
        timestamp: String!
      }
      type RandomPair {
        number: String!
        occurrency: Int!
      }
      input ProductCreateInput {
        title: String!
        price: Float!
        thumbnail: String!
      }
      input ProductUpdateInput {
        title: String
        price: Float
        thumbnail: String
      }
    `);

    // Root resolver
    const root = {
      products: this.apiProductosController.getAllProducts,
      product: this.apiProductosController.getProduct,
      productsMock: this.apiTestsController.getProductosTest,
      randoms: this.randomsController.getRandoms,
      createProduct: this.apiProductosController.createProduct,
      updateProduct: this.apiProductosController.updateProduct,
      deleteProduct: this.apiProductosController.deleteProduct
    };

    router.all(
      "/",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: config.GRAPHIQL
      })
    );

    router.all("/(.*)", this.error404Controller.getError404Api);

    return router;
  }
}

export default ApiRouter;
