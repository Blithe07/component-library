<template>
  {{ analysis }}
</template>

<script lang="ts" setup>
import { ref, readonly, watch } from "vue";
import { dicts } from "@yh-element-plus/plugins";

const props = withDefaults(
  defineProps<{
    /** 字段类型 */
    value: string | number;
    /** 接口地址 */
    url: string;
    /** 默认值 */
    default?: string;
    options?: {
      label: string;
      value: string;
    };
  }>(),
  {
    default: "-",
    options: () =>
      readonly({
        label: "dvName",
        value: "dvCode",
      }),
  },
);

/** 字典列表 */
const analysis = ref("");

const createAnalysis = () => {
  dicts.analysis(props.url, props.value, props.options).then((res) => {
    analysis.value = res ?? props.default;
  });
};

createAnalysis();

watch(() => props.value, createAnalysis);
</script>

<script lang="ts">
export default {
  name: "YhDictsAnalysis",
};
</script>

<style lang="scss" scoped></style>
