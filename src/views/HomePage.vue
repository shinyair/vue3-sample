<script setup lang="ts">
import FullLayout from "@/components/layouts/FullLayout.vue";
</script>

<template>
  <FullLayout>
    <div class="w-full grow flex flex-col justify-center items-center">
      <div>{{ $t("home.hello") }}</div>
    </div>
  </FullLayout>
</template>

<style scoped lang="scss"></style>
