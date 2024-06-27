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
    <div class="w-full h-full flex flex-row justify-center items-center">
      <router-view />
    </div>
  </HeaderLayout>
</template>

<style scoped lang="scss"></style>
