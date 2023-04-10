<template>
  <el-select
    :model-value="modelValue"
    v-bind="$attrs"
    :loading="loading"
    clearable
    filterable
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <slot name="all-option">
      <el-option v-if="showAll" value="" label="全部"></el-option>
    </slot>

    <el-option
      v-for="item in dataOptions"
      :key="(item[value] as string)"
      :value="(item[value] as string)"
      :label="(item[label] as string)"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { useHttp } from "@yh-element-plus/http";

import type { AxiosRequestConfig } from "axios";

const props = withDefaults(
  defineProps<{
    modelValue: unknown[] | string | number | undefined;
    /** 远程数据地址 */
    url: string;
    /** 配置 */
    options?: Partial<{
      label: string;
      value: string;
    }>;
    /** 数据 */
    data?: Record<string, unknown>[];
    /** 配置 */
    config?: AxiosRequestConfig;
    /** 多选 */
    multiple?: boolean;
    /** 显示所有选项 */
    showAll?: boolean;
    /** 是否自动获取 */
    immediate?: boolean;
  }>(),
  {
    immediate: true,
    config: undefined,
    data: undefined,
    options: undefined,
  },
);

defineEmits<{
  (event: "update:modelValue", val: typeof props.modelValue): void;
}>();

/** 获取数据 */
const { loading, data, execute } = useHttp(props.url, props.config, {
  immediate: props.immediate,
});

/** 获取 */
const { label = "dvName", value = "dvCode" } = props.options || {};

/** 转换数据 */
const dataOptions = computed(() => {
  let resData: Record<string, unknown>[] = [];

  /** 优先使用外部数据 */
  if (Array.isArray(props.data)) {
    resData = [...props.data];
  } else if (Array.isArray(data.value)) {
    resData = [...data.value];
  }

  return resData;
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
  name: "YhDictSelect",
};
</script>

<style lang="scss" scoped></style>
