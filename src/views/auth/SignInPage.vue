<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import { toastrError } from "@/utils/toastr";
import { PATHS } from "@/routes";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const { t } = useI18n();

const redirectUrl = ref("");
const showSignInError = (errorType: string) => {
  toastrError(t(`auth.error.${errorType}`));
};
const onSignIn = async (email: string, password: string) => {
  try {
    const errorType = await userStore.signIn(email, password);
    if (!errorType) {
      router.push(redirectUrl.value);
      return;
    }
    showSignInError(errorType);
  } catch (err) {
    showSignInError("unknown");
  }
};
onMounted(() => {
  if (route.query.redirect && typeof route.query.redirect === "string") {
    redirectUrl.value = route.query.redirect;
  } else {
    redirectUrl.value = PATHS.home.path;
  }
});

// TODO: test
const onMockSignIn1 = async () => {
  await onSignIn("abc@dummy.com", "1");
};
const onMockSignIn2 = async () => {
  await onSignIn("def@dummy.com", "1");
};
const onMockSignInError1 = async () => {
  await onSignIn("aaa@dummy.com", "1");
};
const onMockSignInError2 = async () => {
  await onSignIn("def@dummy.com", "2");
};
</script>
<template>
  <div class="flex flex-col">
    <div class="mb-4">
      <el-button type="primary" @click="onMockSignIn1">
        {{ "mock sign in 1" }}
      </el-button>
      <el-button type="primary" @click="onMockSignIn2">
        {{ "mock sign in 2" }}
      </el-button>
    </div>
    <div class="mb-4">
      <el-button type="primary" @click="onMockSignInError1">
        {{ "mock sign in error 1" }}
      </el-button>
      <el-button type="primary" @click="onMockSignInError2">
        {{ "mock sign in error 2" }}
      </el-button>
    </div>
  </div>
</template>
<style lang="scss"></style>
