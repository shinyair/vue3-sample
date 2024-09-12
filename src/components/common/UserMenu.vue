<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { PATHS } from "@/routes";

// hooks
const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
// computed
const userAvatar = computed(() => {
  if (!user.value) {
    return undefined;
  }
  return user.value.avatar;
});
const userShortName = computed(() => {
  if (!user.value) {
    return undefined;
  }
  if (user.value.name) {
    return user.value.name.substring(0, 2);
  }
  return user.value.email.substring(0, 2);
});
// methods
const onSignIn = () => {
  router.push({ name: PATHS.auth.children.signIn.name });
};
const onSignOut = () => {
  userStore.signOut();
  router.push({ name: PATHS.home.name });
};
</script>
<template>
  <div class="w-8 h-8 cursor-pointer">
    <el-dropdown
      v-if="!user"
      class="w-full h-full"
      trigger="click"
      placement="bottom-end"
    >
      <img
        class="w-full h-full rounded-full border"
        src="/avatars/default.png"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="onSignIn">
            {{ $t("auth.sign_in") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown
      v-else
      class="w-full h-full"
      trigger="click"
      placement="bottom-end"
    >
      <img
        v-if="userAvatar"
        class="w-full h-full rounded-full border"
        :src="userAvatar"
      />
      <div v-else class="w-full h-full rounded-full border placeholder">
        <span class="text-base">{{ userShortName?.toUpperCase() }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="user.name">
            {{ user.name }}
          </el-dropdown-item>
          <el-dropdown-item>
            {{ user.email }}
          </el-dropdown-item>
          <el-dropdown-item divided @click="onSignOut">
            {{ $t("auth.sign_out") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style lang="scss">
.placeholder {
  background-color: var(--el-color-info-light-3);
  color: var(--el-text-color-regular);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
