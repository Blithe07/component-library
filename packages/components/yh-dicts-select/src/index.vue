<template>
  <el-select
    :model-value="modelValue"
    v-bind="$attrs"
    :loading="loading"
    clearable
    filterable
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-option v-if="showAll" value="" label="全部"></el-option>
    <el-option
      v-for="item in dataOptions"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { computed, readonly, watch } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { dicts } from "@yh-element-plus/plugins";

const props = withDefaults(
  defineProps<{
    modelValue: unknown[] | string | number | undefined;
    /** 远程数据地址 */
    url: string;
    /** 配置 */
    options?: {
      label: string;
      value: string;
    };
    /** 多选 */
    multiple?: boolean;
    /** 显示所有选项 */
    showAll?: boolean;
    /** 是否自动获取 */
    autoFetch?: boolean;
  }>(),
  {
    autoFetch: true,
    options: () =>
      readonly({
        label: "dvName",
        value: "dvCode",
      }),
  },
);

defineEmits<{
  (event: "update:modelValue", val: typeof props.modelValue): void;
}>();

/** 获取数据 */
const { loading, data, execute } = dicts.useFetch<object>(
  props.url,
  props.autoFetch,
);

/** 转换数据 */
const dataOptions = computed(() => {
  const { label, value } = props.options;
  return data.value.map((val) => {
    return {
      label: val[label as keyof typeof val],
      value: val[value as keyof typeof val],
    };
  });
});

/** 监听url变化 */
watch(
  () => props.url,
  () => {
    if (props.url) {
      execute(props.url);
    }
  },
);
</script>

<script lang="ts">
export default {
  name: "YhDictsSelect",
};
</script>

<style lang="scss" scoped></style>
