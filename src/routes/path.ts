export const PATHS = {
  home: {
    path: "/",
    name: "home",
  },
  forbidden: {
    path: "/403",
    name: "forbidden",
  },
  error: {
    path: "/500",
    name: "error",
  },
  notFound: {
    path: "/404",
    name: "notFound",
  },
  auth: {
    path: "/auth",
    children: {
      signIn: {
        path: "signin",
        name: "authSignIn",
      },
    },
  },
  content: {
    path: "/content",
    children: {
      dashboard: {
        path: "dashboard",
        name: "contentDashboard",
      },
      explore: {
        path: "explore",
        name: "contentExplore",
      },
      product: {
        path: "products/:id",
        name: "contentProduct",
      },
      shop: {
        path: "shops/:id",
        name: "contentShop",
      },
      settings: {
        path: "settings",
        name: "contentSettings",
      },
    },
  },
};
