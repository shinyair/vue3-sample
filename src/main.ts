import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import { router } from "./routes";
import "./index.scss";
import "./debug";

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
