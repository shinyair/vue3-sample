import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineStore } from "pinia";
import axios, { AxiosError } from "axios";
import { useEmitterStore } from "@/stores/emitter";
import { Product, useProductStore } from "@/stores/product";
import { Shop, useShopStore } from "@/stores/shop";
import { PATHS } from "@/routes";
import { SESSION_EXPIRED } from "@/constants/event";

export interface Menu {
  key: string;
  nameId?: string;
  nameText?: string;
  path?: string;
  children?: Menu[];
}

const MENUS: Menu[] = [
  {
    key: "dashboard",
    nameId: "content.dashboard",
    path: "/content/dashboard",
  },
  {
    key: "explore",
    nameId: "content.explore",
    path: "/content/explore",
  },
  {
    key: "products",
    nameId: "content.products",
    children: [],
  },
  {
    key: "shops",
    nameId: "content.shops",
    children: [],
  },
  {
    key: "settings",
    nameId: "content.settings",
    path: "/content/settings",
  },
  // {
  //   key: "navi6",
  //   nameId: "navi6",
  // },
  // {
  //   key: "navi7",
  //   nameId: "navi7",
  // },
  // {
  //   key: "navi8",
  //   nameId: "navi8",
  // },
  // {
  //   key: "navi9",
  //   nameId: "navi9",
  // },
  // {
  //   key: "navi10",
  //   nameId: "navi10",
  // },
  // {
  //   key: "navi11",
  //   nameId: "navi11",
  // },
  // {
  //   key: "navi12",
  //   nameId: "navi12",
  // },
  // {
  //   key: "navi13",
  //   nameId: "navi13",
  // },
  // {
  //   key: "navi14",
  //   nameId: "navi14",
  // },
];

const getAllowedMenus = (menus: Menu[], products: Product[], shops: Shop[]) => {
  return menus.map((menu) => {
    const allowedMenu = { ...menu };
    if (menu.key === "products") {
      const children = products.map((product) => ({
        key: `products_${product.id}`,
        nameText: product.name,
        path: `/content/products/${product.id}`,
      }));
      allowedMenu.children = children;
    } else if (menu.key === "shops") {
      const children = shops.map((shop) => ({
        key: `shops_${shop.id}`,
        nameText: shop.name,
        path: `/content/shops/${shop.id}`,
      }));
      allowedMenu.children = children;
    }
    return allowedMenu;
  });
};

const getMenuByPath = (path: string, menus: Menu[]) => {
  if (menus.length === 0) {
    return undefined;
  }
  for (const menu of menus) {
    if (menu.path && menu.path === path) {
      return menu;
    }
    if (!menu.children) {
      continue;
    }
    for (const submenu of menu.children) {
      if (submenu.path && submenu.path === path) {
        return submenu;
      }
    }
  }
};

const getMenuTreePathByMenuKey = (menuKey: string, menus: Menu[]) => {
  if (menus.length === 0) {
    return [];
  }
  // TODO: use dfs
  const splits = menuKey.split("_");
  if (splits.length === 1) {
    const menu = menus.find((menu) => menu.key === menuKey);
    return menu ? [menu] : [];
  }
  const parentMenuKey = splits[0];
  const parentMenu = menus.find((menu) => menu.key === parentMenuKey);
  if (!parentMenu) {
    return [];
  }
  const menu = parentMenu.children?.find((submenu) => submenu.key === menuKey);
  if (!menu) {
    return [];
  }
  return [parentMenu, menu];
};

export const useSideMenuStore = defineStore("sideMenu", () => {
  // hooks
  const route = useRoute();
  const router = useRouter();
  const emitterStore = useEmitterStore();
  const productStore = useProductStore();
  const shopStore = useShopStore();
  // ref
  const menus = ref<Menu[]>([]);
  const activeMenu = ref<Menu | undefined>();
  const activeMenus = ref<Menu[]>([]);
  // methods
  const loadAllowedMenus = async () => {
    try {
      await Promise.all([
        productStore.loadAllowedProducts(),
        shopStore.loadAllowedShops(),
      ]);
      menus.value = getAllowedMenus(
        MENUS,
        productStore.products,
        shopStore.shops,
      );
    } catch (err) {
      menus.value = getAllowedMenus(MENUS, [], []);
      if (!axios.isAxiosError(err)) {
        router.push({ name: PATHS.error.name });
        return;
      }
      const errResponse = (err as AxiosError).response;
      const status = errResponse ? errResponse.status : -1;
      switch (status) {
        case 401:
          emitterStore.emitter.emit(SESSION_EXPIRED);
          break;
        default:
          router.push({ name: PATHS.error.name });
      }
    }
    activeMenu.value = getMenuByPath(route.path, menus.value);
    activeMenus.value = activeMenu.value
      ? getMenuTreePathByMenuKey(activeMenu.value.key, menus.value)
      : [];
  };
  const selectMenu = (menuKey: string) => {
    const treePathMenus = getMenuTreePathByMenuKey(menuKey, menus.value);
    if (treePathMenus.length === 0) {
      activeMenu.value = undefined;
      activeMenus.value = [];
      return;
    }
    activeMenu.value = treePathMenus[treePathMenus.length - 1];
    activeMenus.value = treePathMenus;
  };
  return {
    menus,
    activeMenu,
    activeMenus,
    loadAllowedMenus,
    selectMenu,
  };
});
