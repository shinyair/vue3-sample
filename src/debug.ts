import * as env from "@/constants/env";
import log from "@/utils/logger";
import { makeServer } from "@/server";

const printDevEnvVars = () => {
  if (!env.IS_DEV) {
    return;
  }
  log.debug(JSON.stringify(env));
};
const runMockServer = () => {
  if (!env.IS_DEV || env.MODE !== "development") {
    return;
  }
  makeServer({
    environment: env.MODE,
  });
};
printDevEnvVars();
runMockServer();
