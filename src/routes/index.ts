import { createMemoryHistory, createRouter } from "vue-router";

import EchoHello from "@/views/EchoHello.vue";
import HelloWorld from "@/views/HelloWorld.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
    props: {
      msg: "Vite + Vue",
    },
  },
  {
    path: "/echohello",
    component: EchoHello,
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
