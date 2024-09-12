<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useShopStore } from "@/stores/shop";

// hooks
const route = useRoute();
const shopStore = useShopStore();
const { activeShop } = storeToRefs(shopStore);
// refs
const isLoading = ref(true);
// methods
const init = async (shopId: string) => {
  isLoading.value = true;
  await shopStore.loadShopById(shopId);
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
    v-else-if="!activeShop"
    class="grow"
    :description="$t('common.empty')"
  />
  <div v-else class="flex flex-col">
    <span class="text-9xl">{{ activeShop.name }}</span>
    <span class="text-base">{{ activeShop.description || "" }}</span>
    <div style="width: 100%; height: 1800px">{{ "test scroll" }}</div>
  </div>
</template>
<style lang="scss"></style>
