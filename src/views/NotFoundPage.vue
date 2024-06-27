<script setup lang="ts">
import HeaderLayout from "@/components/layouts/HeaderLayout.vue";
</script>
<template>
  <HeaderLayout
    :horizontal-scrollable="false"
    :vertical-scrollable="false"
    :has-theme-selector="false"
    :has-user-menu="false"
  >
    <div class="w-full h-full flex flex-col justify-center items-center">
      <span class="text-7xl">{{ $t("page.notFound") }}</span>
    </div>
  </HeaderLayout>
</template>
<style lang="scss"></style>
