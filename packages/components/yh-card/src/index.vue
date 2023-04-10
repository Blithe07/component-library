<template>
  <div
    class="rounded shadow-sm bg-white p-3"
    :class="{
      padding,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** padding */
    padding?: boolean;
  }>(),
  {
    padding: true,
  },
);
</script>

<script lang="ts">
export default {
  name: "YhCard",
};
</script>

<style lang="scss"></style>
