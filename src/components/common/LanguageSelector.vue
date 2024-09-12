<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLanguageStore } from "@/stores/language";

// hooks
const languageStore = useLanguageStore();
const { language, languages } = storeToRefs(languageStore);
// methods
const onLanguageChange = (lang: string) => {
  languageStore.changeLanguage(lang);
};
</script>

<template>
  <div class="flex flex-row justify-start items-center w-28">
    <el-select
      class="w-full"
      size="default"
      :model-value="language"
      @change="onLanguageChange"
    >
      <el-option
        v-for="item in languages"
        :key="item"
        :label="$t(`common.languages.${item}`)"
        :value="item"
      />
    </el-select>
  </div>
</template>

<style scoped lang="scss"></style>
