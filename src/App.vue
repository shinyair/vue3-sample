<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useEmitterStore } from "./stores/emitter";
import { useUserStore } from "./stores/user";
import { notify } from "./utils/confirmation";
import { PATHS } from "./routes";
import { SESSION_EXPIRED } from "./constants/event";

const { t, locale } = useI18n();
const router = useRouter();
const emitterStore = useEmitterStore();
const userStore = useUserStore();
const onSessionExpired = () => {
  notify(
    t("error.session.sessionExpiredMessage"),
    t("error.session.sessionExpiredTitle"),
    () => {
      userStore.signOut();
      router.push({
        name: PATHS.auth.children.signIn.name,
      });
    },
  );
};
onMounted(() => {
  emitterStore.emitter.on(SESSION_EXPIRED, onSessionExpired);
  document.title = t("common.title");
});
watch(locale, () => {
  document.title = t("common.title");
});
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss"></style>
