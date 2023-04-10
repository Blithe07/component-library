<template>
  <slot :dict="analysis">{{ analysis[label] }}</slot>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    /** 字段类型 */
    value: string | number;
    /** 数据 */
    data: Record<string, unknown>[];
    /** 默认值 */
    default?: string;
    options?: Partial<{
      label: string;
      value: string;
    }>;
  }>(),
  {
    default: "",
    options: undefined,
  },
);

const { label = "dvName", value = "dvCode" } = props.options || {};

/** 字典列表 */
const analysis = computed(() => {
  if (Array.isArray(props.data)) {
    const item = props.data.find(
      (val) => props.value && val[value] === props.value,
    );

    if (item) {
      return item;
    }
  }

  return {};
});
</script>

<script lang="ts">
export default {
  name: "YhDict",
};
</script>

<style lang="scss" scoped></style>
