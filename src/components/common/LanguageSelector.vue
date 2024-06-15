<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { changeLanguage } from "../../i18n";

// props
const props = defineProps<{
  size?: "" | "large" | "default" | "small";
}>();
// hooks
const { locale, availableLocales } = useI18n();
// methods
const onLocaleChange = (locale: string) => {
  changeLanguage(locale);
};
</script>

<template>
  <div class="flex flex-row justify-start items-center mx-2 my-2 w-24">
    <el-select
      v-model:model-value="locale"
      class="w-full"
      :size="props.size"
      @change="onLocaleChange"
    >
      <el-option
        v-for="item in availableLocales"
        :key="item"
        :label="$t(`common.languages.${item}`)"
        :value="item"
      />
    </el-select>
  </div>
</template>

<style scoped lang="scss"></style>
