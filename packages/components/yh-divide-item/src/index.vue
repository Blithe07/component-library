<template>
  <div class="divide-item border-l mx-2 h-4"></div>
  <slot></slot>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: "YhDivideItem",
};
</script>

<style lang="scss" scoped>
.divide-item {
  &:first-child {
    display: none;
  }
}
</style>
