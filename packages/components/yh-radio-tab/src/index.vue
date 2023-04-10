<template>
  <div class="radio-tab">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: "YhRadioTab",
};
</script>

<style lang="scss" scoped>
/* radio组铺满 */
.radio-tab {
  :deep(.el-radio-group) {
    display: flex;
    .el-radio-button {
      flex: 1;

      &__inner {
        display: block;
      }
    }
  }
}
</style>
