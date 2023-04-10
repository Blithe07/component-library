<template>
  <main class="flex bg-slate-100 box-border overflow-hidden p-3" :class="[pageHeight]">
    <slot></slot>
  </main>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** 高度 */
    pageHeight?: string;
  }>(),
  {
    pageHeight: "h-screen",
  },
);
</script>

<script lang="ts">
export default {
  name: "YhPage",
};
</script>

<style lang="scss" scoped></style>
