<script setup lang="ts">
import { computed } from "vue";
import LogoTitle from "@/components/common/LogoTitle.vue";
import LanguageSelector from "@/components/common/LanguageSelector.vue";
import ThemeSelector from "@/components/common/ThemeSelector.vue";
import UserMenu from "@/components/common/UserMenu.vue";

// props
export interface Props {
  verticalScrollable?: boolean;
  horizontalScrollable?: boolean;
  hasLanguageSelector?: boolean;
  hasThemeSelector?: boolean;
  hasUserMenu?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  verticalScrollable: true,
  horizontalScrollable: true,
  hasLanguageSelector: true,
  hasThemeSelector: true,
  hasUserMenu: true,
});
// computed
const canScrollX = computed(() => {
  return !!props.horizontalScrollable;
});
const canScrollY = computed(() => {
  return !!props.verticalScrollable;
});
const canScroll = computed(() => {
  return !!props.verticalScrollable || !!props.horizontalScrollable;
});
</script>
<template>
  <el-container class="w-full h-full overlow-hidden">
    <el-header class="flex flex-row justify-between items-center">
      <LogoTitle />
      <div class="flex flex-row justify-end items-center">
        <LanguageSelector v-if="hasLanguageSelector" class="ml-2" />
        <ThemeSelector v-if="hasThemeSelector" class="ml-2" />
        <UserMenu v-if="hasUserMenu" class="ml-2" />
      </div>
    </el-header>
    <el-main class="flex flex-col justify-start items-start overflow-hidden">
      <el-scrollbar
        v-if="canScroll"
        class="w-full grow"
        wrap-class="w-full h-full"
        :view-class="[
          'flex',
          'flex-col',
          !canScrollX ? 'w-full overflow-x-hidden' : 'min-h-full',
          !canScrollY ? 'h-full overflow-y-hidden' : 'min-w-full',
        ]"
      >
        <slot></slot>
      </el-scrollbar>
      <div v-else class="w-full grow">
        <slot></slot>
      </div>
    </el-main>
  </el-container>
</template>
<style scoped lang="scss"></style>
