<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { THEMES, useThemeStore } from "@/stores/theme";

// hooks
const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);
// methods
const toggleTheme = () => {
  if (theme.value === THEMES.dark) {
    themeStore.changeTheme(THEMES.light);
  } else {
    themeStore.changeTheme(THEMES.dark);
  }
};
</script>

<template>
  <div class="flex flex-row justify-start items-center">
    <el-switch
      inline-prompt
      size="large"
      :model-value="theme"
      :active-value="THEMES.dark"
      :inactive-value="THEMES.light"
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="toggleTheme"
    />
  </div>
</template>

<style scoped lang="scss"></style>
