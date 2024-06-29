import { createServer, Model } from "miragejs";

import * as echo from "@/server/echo";

const DB_KEY = "migratejs-db";

export const makeServer = ({ environment = "development" }) => {
  const server = createServer({
    environment: environment,
    models: {
      echo: Model,
    },
    routes() {
      const handledRequest = this.pretender.handledRequest;
      this.pretender.handledRequest = (verb, path, requeset) => {
        // persist db
        if (verb.toLowerCase() !== "get" && verb.toLowerCase() !== "head") {
          localStorage.setItem(DB_KEY, JSON.stringify(this.db.dump()));
        }
        // invoke existing handlers
        handledRequest && handledRequest(verb, path, requeset);
      };
      this.namespace = "";
      this.get("/echo", echo.hello);
      this.post("/echo", echo.record);
      this.passthrough();
    },
    seeds(server) {
      // init db by localstorage or static data
      const dbData = localStorage.getItem(DB_KEY);
      if (dbData) {
        server.db.loadData(JSON.parse(dbData));
      } else {
        server.db.loadData({
          echos: [],
        });
      }
    },
  });
  return server;
};
