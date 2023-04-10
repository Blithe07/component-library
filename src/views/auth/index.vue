<template>
  <!-- <el-switch v-model="test"></el-switch> -->
  <el-button v-auth="'xx:xx:xx'" type="primary" @click="xxx">11</el-button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const xxx = () => {
  console.log(1);
};
</script>

<script lang="ts">
export default {
  name: "PageAuth",
};
</script>

<style lang="scss" scoped></style>
