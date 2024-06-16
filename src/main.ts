import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import * as env from "./constants/env";
import "./index.scss";

const printDevEnvVars = () => {
  if (!env.IS_DEV) {
    return;
  }
  console.log(JSON.stringify(env));
};
printDevEnvVars();

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
