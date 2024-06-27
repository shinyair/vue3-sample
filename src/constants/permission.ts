export const PERMISSIONS = {
  CONTENT: {
    DASHBOARD: {
      READ: "content/dashboard/read",
      WRITE: "content/dashboard/write",
    },
    EXPLORE: {
      READ: "content/explore/read",
    },
    PRODUCT: {
      READ: "content/product/:id/read",
      WRITE: "content/product/:id/write",
    },
    SHOP: {
      READ: "content/shop/:id/read",
      WRITE: "content/shop/:id/write",
    },
    SETTINGS: {
      READ: "content/settings/read",
      WRITE: "content/settings/write",
    },
  },
};
