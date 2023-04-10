<template>
  <yh-product-select v-model="test" @change="testx"></yh-product-select>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const test = ref("");

const testx = (a: string) => {
  console.log(2);
};
</script>

<script lang="ts">
export default {
  name: "PageProduct",
};
</script>

<style lang="scss" scoped></style>
