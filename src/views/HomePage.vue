<script setup lang="ts">
import { ref } from "vue";
import HeaderLayout from "@/components/layouts/HeaderLayout.vue";
import { PATHS } from "@/routes";

const routePaths = ref(PATHS);
</script>

<template>
  <HeaderLayout :horizontal-scrollable="false" :vertical-scrollable="false">
    <div class="w-full h-full flex flex-col">
      <div class="w-full grow flex flex-row justify-center items-center">
        <span class="text-9xl">{{ $t("home.hello") }}</span>
      </div>
      <div class="w-full h-1/3 flex flex-row justify-end items-start">
        <div
          class="w-full h-full flex flex-col justify-start items-center sm:w-1/4 sm:items-start"
        >
          <div class="mb-2">
            <el-button
              link
              class="text-lg"
              @click="$router.push(routePaths.notFound.path)"
            >
              {{ "404" }}
            </el-button>
          </div>
          <div class="mb-2">
            <el-button
              link
              class="text-lg"
              type="warning"
              @click="$router.push(routePaths.forbidden.path)"
            >
              {{ "403" }}
            </el-button>
          </div>
          <div class="mb-2">
            <el-button
              link
              class="text-lg"
              type="danger"
              @click="$router.push(routePaths.error.path)"
            >
              {{ "500" }}
            </el-button>
          </div>
          <div class="mb-2">
            <el-button
              link
              class="text-lg"
              type="primary"
              @click="
                $router.push({
                  name: routePaths.content.children.dashboard.name,
                })
              "
            >
              {{ $t("content.title") }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </HeaderLayout>
</template>

<style scoped lang="scss"></style>
