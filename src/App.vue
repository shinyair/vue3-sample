<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import HelloWorld from "./views/HelloWorld.vue";

const { t, locale } = useI18n();
onMounted(() => {
  document.title = t("common.title");
});
watch(locale, () => {
  document.title = t("common.title");
});
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped lang="scss"></style>
