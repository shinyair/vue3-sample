<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useSideMenuStore } from "@/stores/sideMenu";

// define
const emit = defineEmits(["select"]);
// hooks
const { t } = useI18n();
const router = useRouter();
const menuStore = useSideMenuStore();
const { menus, activeMenu } = storeToRefs(menuStore);
// refs
const defaultActiveMenu = ref(activeMenu.value);
// compouted
const hasActiveMenu = computed(() => !!activeMenu.value);
// methods
const getMenuName = (menuNameId?: string, menuNameText?: string) => {
  if (menuNameText) {
    return menuNameText;
  }
  return menuNameId ? t(menuNameId) : t("common.unknown");
};
const onClickMenu = (menuKey: string, menuKeys: string[]) => {
  menuStore.selectMenu(menuKey);
  if (activeMenu.value && activeMenu.value.path) {
    router.push(activeMenu.value.path);
  }
  emit("select", menuKey, menuKeys);
};
// lifecycle
watch(hasActiveMenu, (newValue, oldValue) => {
  // update default active menu after menus are inited
  if (!oldValue && newValue) {
    defaultActiveMenu.value = activeMenu.value;
  }
});
</script>
<template>
  <el-menu
    class="w-full p-2 border-0"
    :default-active="defaultActiveMenu?.key"
    @select="onClickMenu"
  >
    <template v-for="menu in menus" :key="menu.key">
      <el-sub-menu v-if="menu.children" :index="menu.key">
        <template #title>
          <span>{{ getMenuName(menu.nameId, menu.nameText) }}</span>
        </template>
        <template v-if="menu.children.length > 0">
          <el-menu-item
            v-for="submenu in menu.children"
            :key="submenu.key"
            :index="submenu.key"
          >
            <span>{{ getMenuName(submenu.nameId, submenu.nameText) }}</span>
          </el-menu-item>
        </template>
        <el-menu-item-group v-else :title="$t('common.empty')" />
      </el-sub-menu>
      <el-menu-item v-else :index="menu.key">
        <span>
          {{ getMenuName(menu.nameId, menu.nameText) }}
        </span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<style lang="scss"></style>
