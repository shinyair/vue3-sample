import { createWebHistory, createRouter } from "vue-router";

import { PATHS } from "@/routes/path";

import HomePage from "@/views/HomePage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import ForbiddenPage from "@/views/ForbiddenPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

import AuthPage from "@/views/AuthPage.vue";
import SignInPage from "@/views/auth/SignInPage.vue";

export const routes = [
  {
    path: PATHS.home.path,
    name: PATHS.home.name,
    component: HomePage,
  },
  {
    path: PATHS.error.path,
    name: PATHS.error.name,
    component: ErrorPage,
  },
  {
    path: PATHS.forbidden.path,
    name: PATHS.forbidden.name,
    component: ForbiddenPage,
  },
  {
    path: PATHS.notFound.path,
    name: PATHS.notFound.name,
    component: NotFoundPage,
  },
  {
    path: PATHS.auth.path,
    component: AuthPage,
    children: [
      {
        path: PATHS.auth.children.signIn.path,
        name: PATHS.auth.children.signIn.name,
        component: SignInPage,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
