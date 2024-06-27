<script setup lang="ts">
import { computed } from "vue";

// props
export interface Props {
  verticalScrollable?: boolean;
  horizontalScrollable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  verticalScrollable: true,
  horizontalScrollable: true,
});
// computed
const canScrollX = computed(() => {
  return !!props.horizontalScrollable;
});
const canScrollY = computed(() => {
  return !!props.verticalScrollable;
});
const canScroll = computed(() => {
  return !!props.verticalScrollable || !!props.horizontalScrollable;
});
</script>
<template>
  <div
    class="w-full h-full flex flex-col justify-start items-start overflow-hidden"
  >
    <el-scrollbar
      v-if="canScroll"
      class="w-full grow"
      wrap-class="w-full h-full"
      :view-class="[
        'flex',
        'flex-col',
        !canScrollX ? 'w-full overflow-x-hidden' : 'min-h-full',
        !canScrollY ? 'h-full overflow-y-hidden' : 'min-w-full',
      ]"
    >
      <slot></slot>
    </el-scrollbar>
    <div v-else class="w-full grow">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
