<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
onMounted(() => {
  document.title = t("common.title");
});
watch(locale, () => {
  document.title = t("common.title");
});
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss"></style>
