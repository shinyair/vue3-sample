import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { defineStore } from "pinia";
import { getProduct, getAllowedProducts } from "@/apis/content";
import { toastrError } from "@/utils/toastr";

export interface Product {
  id: string;
  name: string;
  description?: string;
}

export const useProductStore = defineStore("product", () => {
  const { t } = useI18n();
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
      toastrError(t("error.load.failedToLoadData"));
    }
  };
  return {
    products,
    activeProduct,
    loadAllowedProducts,
    loadProductById,
  };
});
