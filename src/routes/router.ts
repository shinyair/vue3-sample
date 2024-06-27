import { createWebHistory, createRouter } from "vue-router";

import { PATHS } from "@/routes/path";

import HomePage from "@/views/HomePage.vue";

export const routes = [
  {
    path: PATHS.home.path,
    name: PATHS.home.name,
    component: HomePage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
