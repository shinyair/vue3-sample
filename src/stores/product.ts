import { ref } from "vue";
import { useI18n } from "vue-i18n";
import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useEmitterStore } from "@/stores/emitter";
import { getProduct, getAllowedProducts } from "@/apis/content";
import { toastrError } from "@/utils/toastr";
import { SESSION_EXPIRED } from "@/constants/event";

export interface Product {
  id: string;
  name: string;
  description?: string;
}

export const useProductStore = defineStore("product", () => {
  const { t } = useI18n();
  const emitterStore = useEmitterStore();
  // refs
  const products = ref<Product[]>([]);
  const activeProduct = ref<Product | undefined>();
  const abortLoadAllowedProducts = ref<AbortController>();
  const abortLoadProductById = ref<AbortController>();
  // methods
  const loadAllowedProducts = async () => {
    if (abortLoadAllowedProducts.value) {
      abortLoadAllowedProducts.value.abort();
    }
    abortLoadAllowedProducts.value = new AbortController();
    const alloweds = await getAllowedProducts({
      signal: abortLoadAllowedProducts.value.signal,
    });
    products.value = alloweds.map((allowed) => ({
      id: allowed.id,
      name: allowed.name,
    }));
  };
  const loadProductById = async (id: string) => {
    activeProduct.value = undefined;
    try {
      if (abortLoadProductById.value) {
        abortLoadProductById.value.abort();
      }
      abortLoadProductById.value = new AbortController();
      const product = await getProduct(id, {
        signal: abortLoadProductById.value.signal,
      });
      activeProduct.value = product;
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
  return {
    products,
    activeProduct,
    loadAllowedProducts,
    loadProductById,
  };
});
