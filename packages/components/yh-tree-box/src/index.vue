<template>
  <div
    class="tree-box flex-1 mt-2 overflow-x-hidden overflow-y-auto border"
    :class="{ 'hide-arrow': hideArrow }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /** 显示箭头 */
  hideArrow?: boolean;
}>();
</script>

<script lang="ts">
export default {
  name: "YhTreeBox",
};
</script>

<style lang="scss" scoped>
.tree-box {
  :deep(.el-tree .el-tree-node__content) {
    height: 34px;
    border-bottom: 1px solid #eee;
  }

  &.hide-arrow {
    :deep(.el-tree .el-tree-node__content) {
      padding-left: 12px !important;

      .el-icon {
        display: none;
      }
    }
  }
}
</style>
