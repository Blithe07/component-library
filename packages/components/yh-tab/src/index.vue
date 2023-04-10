<template>
  <div class="flex">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from "vue";

const props = defineProps<{
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (evet: "update:modelValue", val: number | string): void;
  (evet: "change", val: number | string): void;
}>();

const tabValue = computed(() => props.modelValue);

provide("tab", tabValue);
provide("tabUpdate", (val: string | number) => {
  emit("update:modelValue", val);
  emit("change", val);
});
</script>

<script lang="ts">
export default {
  name: "YhTab",
};
</script>

<style lang="scss" scoped></style>
