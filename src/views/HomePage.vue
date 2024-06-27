<script setup lang="ts">
import HeaderLayout from "@/components/layouts/HeaderLayout.vue";
</script>

<template>
  <HeaderLayout>
    <div class="w-full grow flex flex-col justify-center items-center">
      <div>{{ $t("home.hello") }}</div>
    </div>
  </HeaderLayout>
</template>

<style scoped lang="scss"></style>
