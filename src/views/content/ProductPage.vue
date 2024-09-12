<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import { replaceParams } from "@/utils/str";
import { PERMISSIONS } from "@/constants/permission";

// hooks
const route = useRoute();
const userStore = useUserStore();
const productStore = useProductStore();
const { activeProduct } = storeToRefs(productStore);
// refs
const isLoading = ref(true);
const hasTabEdit = ref(false);
const activeTab = ref("overview");
// methods
const init = async (productId: string) => {
  isLoading.value = true;
  // ajax
  await productStore.loadProductById(productId);
  // update after ajax done
  const requiredPermission = replaceParams(PERMISSIONS.CONTENT.PRODUCT.WRITE, {
    id: productId,
  });
  hasTabEdit.value = userStore.hasPermission(requiredPermission);
  isLoading.value = false;
};
// lifecycle
onMounted(async () => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  await init(id);
});
watch(
  () => {
    return route.params.id;
  },
  async (newIdParam) => {
    const newId = Array.isArray(newIdParam) ? newIdParam[0] : newIdParam;
    await init(newId);
  },
);
</script>
<template>
  <el-container
    v-if="isLoading"
    v-loading="true"
    class="grow justify-center items-center"
  />
  <el-empty
    v-else-if="!activeProduct"
    class="grow"
    :description="$t('common.empty')"
  />
  <div v-else class="flex flex-col pr-4">
    <el-tabs v-model="activeTab">
      <el-tab-pane name="overview" :label="$t('content.product.overview')">
        <div class="text-9xl">{{ activeProduct.name }}</div>
        <div class="text-base">{{ activeProduct.description || "" }}</div>
        <div style="width: 100%; height: 1800px">{{ "test scroll" }}</div>
      </el-tab-pane>
      <el-tab-pane
        v-if="hasTabEdit"
        name="edit"
        :label="$t('content.product.edit')"
      >
        <el-input
          v-model="activeProduct.description"
          type="textarea"
          :readonly="true"
          :rows="10"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss"></style>
