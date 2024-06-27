import { createWebHistory, createRouter } from "vue-router";

import { PATHS } from "@/routes/path";
import { PERMISSIONS } from "@/constants/permission";

import HomePage from "@/views/HomePage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import ForbiddenPage from "@/views/ForbiddenPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

import AuthPage from "@/views/AuthPage.vue";
import SignInPage from "@/views/auth/SignInPage.vue";

import ContentPage from "@/views/ContentPage.vue";
import DashboardPage from "@/views/content/DashboardPage.vue";
import ExplorePage from "@/views/content/ExplorePage.vue";
import ProductPage from "@/views/content/ProductPage.vue";
import ShopPage from "@/views/content/ShopPage.vue";
import SettingsPage from "@/views/content/SettingsPage.vue";

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
    path: PATHS.content.path,
    component: ContentPage,
    children: [
      {
        path: PATHS.content.children.dashboard.path,
        name: PATHS.content.children.dashboard.name,
        component: DashboardPage,
        meta: {
          requiresAuth: true,
          requiredPermission: PERMISSIONS.CONTENT.DASHBOARD.READ,
        },
      },
      {
        path: PATHS.content.children.explore.path,
        name: PATHS.content.children.explore.name,
        component: ExplorePage,
        meta: {
          requiresAuth: true,
          requiredPermission: PERMISSIONS.CONTENT.EXPLORE.READ,
        },
      },
      {
        path: PATHS.content.children.product.path,
        name: PATHS.content.children.product.name,
        component: ProductPage,
        meta: {
          requiresAuth: true,
          requiredPermission: PERMISSIONS.CONTENT.PRODUCT.READ,
        },
      },
      {
        path: PATHS.content.children.shop.path,
        name: PATHS.content.children.shop.name,
        component: ShopPage,
        meta: {
          requiresAuth: true,
          requiredPermission: PERMISSIONS.CONTENT.SHOP.READ,
        },
      },
      {
        path: PATHS.content.children.settings.path,
        name: PATHS.content.children.settings.name,
        component: SettingsPage,
        meta: {
          requiresAuth: true,
          requiredPermission: PERMISSIONS.CONTENT.SETTINGS.WRITE,
        },
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
