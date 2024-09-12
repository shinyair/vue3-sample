<script setup lang="ts">
import { useRouter } from "vue-router";
import { PATHS } from "@/routes";
import logo from "@/assets/logo.svg";

// hooks
const router = useRouter();
// methods
const onClickLogo = () => {
  router.push({ name: PATHS.home.name });
};
</script>
<template>
  <div
    class="flex flex-row justify-start items-center cursor-pointer"
    @click="onClickLogo"
  >
    <img :src="logo" height="100%" />
    <span class="mx-2 text-2xl">{{ $t("common.title") }}</span>
  </div>
</template>
<style lang="scss"></style>
