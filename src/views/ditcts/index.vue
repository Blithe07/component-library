<template>
  <yh-dict-select
    :model-value="text"
    :url="x"
    :options="{
      label: 'userName',
      value: 'userCode',
    }"
    :immediate="false"
    @update:model-value="text = $event"
  ></yh-dict-select>
  <yh-dict
    value="whj"
    :data="data ?? []"
    :options="{
      label: 'userName',
      value: 'userCode',
    }"
  >
    <template #default="{ dict }">{{ dict.userName }}</template>
  </yh-dict>

  <yh-link>xxx</yh-link>
  <button @click="test">1</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useHttp } from "@yh-element-plus/http";

const x = ref(" ");
const text = ref("");

const test = () => {
  x.value = "/ycmp-auth-center/api/feign/user/list";
};

const { data } = useHttp("/ycmp-auth-center/api/feign/user/list");
</script>

<script lang="ts">
export default {
  name: "PageDitcts",
};
</script>

<style lang="scss" scoped></style>
