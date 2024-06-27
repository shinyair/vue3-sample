<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { Operation } from "@element-plus/icons-vue";

import LogoTitle from "@/components/common/LogoTitle.vue";
import LanguageSelector from "@/components/common/LanguageSelector.vue";
import ThemeSelector from "@/components/common/ThemeSelector.vue";
import UserMenu from "@/components/common/UserMenu.vue";
import AsideMenu from "@/components/common/AsideMenu.vue";

import { useSideMenuStore } from "@/stores/sideMenu";
import { PATHS } from "@/routes";

const MD_WIDHT_SIZE = 768;
const canShowDrawer = () => {
  return window.innerWidth < MD_WIDHT_SIZE;
};

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
// hooks
const sideMenuStore = useSideMenuStore();
const { activeMenus } = storeToRefs(sideMenuStore);
// ref
const isLoading = ref(true);
const hasDrawer = ref(canShowDrawer());
const isDrawerOpen = ref(false);
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
// methods
const initLoadingData = async () => {
  isLoading.value = true;
  await sideMenuStore.loadAllowedMenus();
  isLoading.value = false;
};
const onResize = () => {
  hasDrawer.value = canShowDrawer();
};
const onShowDrawer = () => {
  if (!hasDrawer.value) {
    return;
  }
  isDrawerOpen.value = true;
};
const onCloseDrawer = () => {
  isDrawerOpen.value = false;
};
// lifecycle
onMounted(async () => {
  await initLoadingData();
  window.addEventListener("resize", onResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});
</script>
<template>
  <el-container class="w-full h-full overlow-hidden">
    <el-header
      class="flex flex-row justify-between items-center border-b boder-color-menu"
    >
      <LogoTitle />
      <div class="flex flex-row justify-end items-center">
        <LanguageSelector v-if="hasLanguageSelector" class="ml-2" />
        <ThemeSelector v-if="hasThemeSelector" class="ml-2" />
        <UserMenu v-if="hasUserMenu" class="ml-2" />
      </div>
    </el-header>
    <el-main
      v-loading="isLoading"
      class="flex flex-row justify-start items-start overflow-hidden p-0"
    >
      <el-drawer
        v-if="hasDrawer"
        v-model="isDrawerOpen"
        class="flex flex-col w-72"
        size=""
        direction="ltr"
      >
        <AsideMenu @select="onCloseDrawer" />
      </el-drawer>
      <el-aside
        :class="[
          'h-full',
          hasDrawer ? 'w-0' : 'w-72',
          'aside-transition',
          isLoading ? 'invisible' : '',
        ]"
      >
        <el-scrollbar
          class="w-full h-full"
          wrap-class="w-full h-full"
          view-class="w-full min-h-full overflow-x-hidden pr-2"
        >
          <AsideMenu v-if="!hasDrawer" />
        </el-scrollbar>
      </el-aside>
      <div
        :class="[
          'w-full',
          'h-full',
          'flex',
          'flex-col',
          'justify-start',
          'items-start',
          'overflow-hidden',
          'pl-4',
          isLoading ? 'invisible' : '',
        ]"
      >
        <div class="flex flex-row flex-row items-center h-16">
          <el-icon
            v-if="hasDrawer"
            class="cursor-pointer navi-color-icon mr-2"
            size="20"
            @click="onShowDrawer"
          >
            <Operation />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: PATHS.home.path }">
              {{ $t("home.title") }}
            </el-breadcrumb-item>
            <template v-if="activeMenus.length > 0">
              <el-breadcrumb-item v-for="menu in activeMenus" :key="menu.key">
                {{
                  menu.nameText
                    ? menu.nameText
                    : menu.nameId
                      ? $t(menu.nameId)
                      : $t("common.unknown")
                }}
              </el-breadcrumb-item>
            </template>
            <el-breadcrumb-item v-else>
              {{ $t("common.unknown") }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
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
      </div>
    </el-main>
  </el-container>
  <el-backtop :right="100" :bottom="100" />
</template>
<style scoped lang="scss">
.boder-color-menu {
  border-color: var(--el-menu-border-color);
}
.navi-color-icon {
  color: var(--el-color-info-light);
}
.aside-transition {
  // unify animation with drawer
  transition: all var(--el-transition-duration);
}
</style>
