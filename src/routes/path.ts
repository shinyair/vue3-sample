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
};
