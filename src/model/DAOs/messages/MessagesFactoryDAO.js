class MessagesFactoryDAO {
  static async get(PERS) {
    switch (PERS) {
      case "file": {
        const { default: MessagesDAOFS } = await import("./MessagesDAOFS.js");
        return new MessagesDAOFS();
      }
      case "mongodb":
      case "mongodb_atlas": {
        const { default: MessagesDAOMongoDB } = await import(
          "./MessagesDAOMongoDB.js"
        );
        return new MessagesDAOMongoDB();
      }
      case "mem":
      default: {
        const { default: MessagesDAOMem } = await import("./MessagesDAOMem.js");
        return new MessagesDAOMem();
      }
    }
  }
}

export default MessagesFactoryDAO;
