<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sunny } from "@element-plus/icons-vue";

// props
const props = defineProps<{
  size?: "" | "large" | "default" | "small";
}>();
// hooks
const isDark = useDark({
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
// methods
const toggleTheme = () => {
  toggleDark();
};
</script>

<template>
  <div class="flex flex-row justify-start items-center mx-2 my-2">
    <el-switch
      :model-value="isDark"
      inline-prompt
      :size="props.size"
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="toggleTheme"
    />
  </div>
</template>

<style scoped lang="scss"></style>
