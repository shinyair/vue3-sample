import { createServer, Model } from "miragejs";
import * as user from "@/server/user";
import * as content from "@/server/content";

const STORAGE_DB_KEY = "migratejs-db";

export const makeServer = ({ environment = "development" }) => {
  const server = createServer({
    environment: environment,
    models: {
      user: Model,
      product: Model,
      shop: Model,
    },
    routes() {
      const handledRequest = this.pretender.handledRequest;
      this.pretender.handledRequest = (verb, path, requeset) => {
        // persist db
        if (verb.toLowerCase() !== "get" && verb.toLowerCase() !== "head") {
          localStorage.setItem(STORAGE_DB_KEY, JSON.stringify(this.db.dump()));
        }
        // invoke existing handlers
        handledRequest && handledRequest(verb, path, requeset);
      };
      this.namespace = "";
      this.post("/auth/signin", user.signIn);
      this.get("/products/:id", content.getProduct);
      this.get("/products/permissions/me", content.getAllowedProducts);
      this.get("/shops/:id", content.getShop);
      this.get("/shops/permissions/me", content.getAllowedShops);
      this.passthrough();
    },
    seeds(server) {
      // init db by localstorage or static data
      const dbData = localStorage.getItem(STORAGE_DB_KEY);
      if (dbData) {
        server.db.loadData(JSON.parse(dbData));
      } else {
        server.db.loadData({
          users: user.DATA,
          products: content.DATA_PRODUCTS,
          shops: content.DATA_SHOPS,
        });
      }
    },
  });
  return server;
};
