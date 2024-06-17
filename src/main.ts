import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import * as env from "./constants/env";
import { makeServer } from "./server";
import { router } from "./routes";
import "./index.scss";

const printDevEnvVars = () => {
  if (!env.IS_DEV) {
    return;
  }
  console.log(JSON.stringify(env));
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

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(ElementPlus);
app.use(router);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
