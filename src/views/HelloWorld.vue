<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LanguageSelector from "@/components/common/LanguageSelector.vue";
import ThemeSelector from "@/components/common/ThemeSelector.vue";

const props = defineProps<{
  msg: string;
}>();
const router = useRouter();
const count = ref(0);
const go2EchoPage = () => {
  router.push({ path: "/echohello", query: { message: props.msg } });
};
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
        <div class="py-8 text-9xl">{{ props.msg }}</div>

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
          <el-button type="primary" class="mt-2" @click="count++">
            {{ $t("hello.count", { number: count }) }}
          </el-button>
          <el-button type="primary" class="mt-2" @click="go2EchoPage">
            {{ $t("hello.to_echo_page") }}
          </el-button>
          <p class="py-8">
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
          </p>
          <p class="">
            Check out
            <a
              href="https://vuejs.org/guide/quick-start.html#local"
              target="_blank"
              >create-vue</a
            >, the official Vue + Vite starter
          </p>
          <p class="py-8">
            Install
            <a href="https://github.com/vuejs/language-tools" target="_blank"
              >Volar</a
            >
            in your IDE for a better DX
          </p>
          <p class="py-8">Click on the Vite and Vue logos to learn more</p>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
