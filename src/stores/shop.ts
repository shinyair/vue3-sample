import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { defineStore } from "pinia";
import { getAllowedShops, getShop } from "@/apis/content";
import { toastrError } from "@/utils/toastr";

export interface Shop {
  id: string;
  name: string;
  description?: string;
}

export const useShopStore = defineStore("shop", () => {
  // hooks
  const { t } = useI18n();
  // refs
  const shops = ref<Shop[]>([]);
  const activeShop = ref<Shop | undefined>();
  const abortLoadAllowedShops = ref<AbortController>();
  const abortLoadShopById = ref<AbortController>();
  // methods
  const loadAllowedShops = async () => {
    if (abortLoadAllowedShops.value) {
      abortLoadAllowedShops.value.abort();
    }
    abortLoadAllowedShops.value = new AbortController();
    const alloweds = await getAllowedShops({
      signal: abortLoadAllowedShops.value?.signal,
    });
    shops.value = alloweds.map((allowed) => ({
      id: allowed.id,
      name: allowed.name,
    }));
  };
  const loadShopById = async (id: string) => {
    activeShop.value = undefined;
    try {
      if (abortLoadShopById.value) {
        abortLoadShopById.value.abort();
      }
      abortLoadShopById.value = new AbortController();
      const product = await getShop(id, {
        signal: abortLoadShopById.value.signal,
      });
      activeShop.value = product;
    } catch (err) {
      toastrError(t("error.load.failedToLoadData"));
    }
  };
  return { shops, activeShop, loadAllowedShops, loadShopById };
});
