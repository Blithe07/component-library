<template>
  <el-select
    :model-value="modelValue"
    :loading="loading"
    :multiple="multiple"
    v-bind="$attrs"
    placeholder="请选择"
    filterable
    clearable
    collapse-tags
    collapse-tags-tooltip
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in data ?? []"
      :key="item.id"
      :value="item.fundCode"
      :label="item.fundShortName"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { ElSelect, ElOption } from "element-plus";
import { useHttp } from "@yh-element-plus/http";

import type { ProductItem } from "../type";

const props = defineProps<{
  modelValue: string | number | boolean | unknown[] | undefined;
  multiple?: boolean;
}>();

defineEmits<{
  (event: "update:modelValue", val: typeof props.modelValue): void;
}>();

/** 获取数据 */
const { data, loading } = useHttp<ProductItem[]>(
  "/yhinn-baseparam/fundInfo/queryFundInfoAll",
);
</script>

<script lang="ts">
export default {
  name: "YhProductSelect",
};
</script>

<style lang="scss" scoped></style>
