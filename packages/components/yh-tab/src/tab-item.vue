<template>
  <div
    class="tab-item"
    :class="{
      active: tabValue === value,
    }"
    @click="tabUpdate?.(value)"
  >
    <span class="tab-item__title">
      <slot>{{ label }}</slot>
    </span>
    <span v-if="$slots.badge || badge !== undefined" class="tab-item__badge">
      <slot name="badge">{{ badge }}</slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";

defineProps<{
  label: string | number;
  value: string | number;
  badge?: string | number;
}>();

const tabValue = inject<string>("tab");
const tabUpdate = inject<(val: string | number) => void>("tabUpdate");
</script>

<script lang="ts">
export default {
  name: "YhTabItem",
};
</script>

<style lang="scss" scoped>
.tab-item {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 50px;
  height: 32px;
  padding: 0 12px;
  margin-right: -1px;
  text-align: center;
  border: var(--el-border);

  &:hover {
    cursor: pointer;
    .tab-item__title {
      color: var(--primary-color);
    }
  }

  &.active {
    z-index: 10;
    color: var(--primary-color);
    background-color: var(--el-color-primary-light-9);
    border: 1px solid var(--primary-color);
    pointer-events: none;

    .tab-item__title {
      color: var(--primary-color);
    }
  }

  &:first-child {
    border-bottom-left-radius: var(--el-border-radius-base);
    border-top-left-radius: var(--el-border-radius-base);
  }

  &:last-child {
    border-bottom-right-radius: var(--el-border-radius-base);
    border-top-right-radius: var(--el-border-radius-base);
  }

  &__title {
    font-size: 14px;
    color: #666;
    line-height: 1;
  }

  &__badge {
    min-width: 18px;
    height: 16px;
    padding: 0 2px;
    margin-left: 3px;
    line-height: 16px;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    background-color: var(--primary-color);
    border-radius: 99px;
    transform: translateY(-26%);
  }
}
</style>
