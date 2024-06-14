import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "./style.scss";

const app = createApp(App);
app.use(i18n);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
