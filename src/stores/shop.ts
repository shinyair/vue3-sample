import { ref } from "vue";
import { useI18n } from "vue-i18n";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useEmitterStore } from "@/stores/emitter";
import { getAllowedShops, getShop } from "@/apis/content";
import { toastrError } from "@/utils/toastr";
import { SESSION_EXPIRED } from "@/constants/event";

export interface Shop {
  id: string;
  name: string;
  description?: string;
}

export const useShopStore = defineStore("shop", () => {
  // hooks
  const { t } = useI18n();
  const emitterStore = useEmitterStore();
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
      if (!axios.isAxiosError(err)) {
        toastrError(t("error.load.failedToLoadData"));
        return;
      }
      if (axios.isCancel(err)) {
        return;
      }
      const errResponse = (err as AxiosError).response;
      const status = errResponse ? errResponse.status : -1;
      switch (status) {
        case 401:
          emitterStore.emitter.emit(SESSION_EXPIRED);
          break;
        case 403:
          toastrError(t("error.load.noPermissionToLoadData"));
          break;
        default:
          toastrError(t("error.load.failedToLoadData"));
      }
    }
  };
  return { shops, activeShop, loadAllowedShops, loadShopById };
});
