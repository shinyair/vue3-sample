<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { record } from "@/apis/echo";
import LanguageSelector from "@/components/common/LanguageSelector.vue";
import ThemeSelector from "@/components/common/ThemeSelector.vue";

const route = useRoute();
const echoMessage = ref("");
const msg = ref("");
onMounted(async () => {
  msg.value = route.query.message?.toString() || "";
  echoMessage.value = await record("hello");
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col justify-start items-start overflow-hidden"
  >
    <div class="w-full h-16 flex flex-row justify-end items-center">
      <LanguageSelector size="small" />
      <ThemeSelector size="default" />
    </div>
    <el-scrollbar class="w-full grow">
      <div class="w-full flex flex-col justify-center items-center">
        <div class="py-8 text-9xl">{{ msg }}</div>

        <div class="flex flex-row justify-center items-center py-8">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" width="200px" />
          </a>
          <a href="https://vuejs.org/" target="_blank">
            <img
              src="./../assets/vue.svg"
              class="logo vue"
              alt="Vue logo"
              width="200px"
            />
          </a>
        </div>

        <div class="flex flex-col justify-center items-center">
          <p class="py-8">{{ $t("hello.echo_page") }}</p>
        </div>

        <div class="flex flex-col justify-center items-center">
          <p class="py-8">{{ echoMessage }}</p>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
