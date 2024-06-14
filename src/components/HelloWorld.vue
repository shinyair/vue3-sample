<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDark, useToggle } from "@vueuse/core";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { changeLanguage } from "../i18n";

defineProps<{ msg: string }>();

const count = ref(0);
const { locale } = useI18n(); // use as global scope
const isDark = useDark({
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);

function toggleLanguage() {
  if (locale.value === "en") {
    changeLanguage("zh");
  } else {
    changeLanguage("en");
  }
}

function toggleTheme() {
  toggleDark();
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="flex flex-col justify-center items-center">
    <div class="flex flex-row justify-center items-center">
      <el-button type="primary" @click="count++">
        {{ $t("hello.count", { number: count }) }}
      </el-button>
      <el-button type="primary" @click="toggleLanguage">
        {{ $t("hello.change_language") }}
      </el-button>
      <el-switch
        :model-value="isDark"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleTheme"
      />
    </div>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
