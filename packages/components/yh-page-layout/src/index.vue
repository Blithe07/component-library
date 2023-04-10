<template>
  <yh-page :class="[pageHeight]">
    <!-- 左边 -->
    <yh-card v-if="$slots.left" class="h-full w-56 mr-3" :class="[leftClass]">
      <slot name="left"></slot>
    </yh-card>

    <div class="h-full flex flex-col flex-1 overflow-hidden">
      <!-- 搜索 -->
      <yh-card v-if="$slots.search" class="flex mb-2 py-2 layout-head flex-shrink-0">
        <div class="flex-1">
          <slot name="search"></slot>
        </div>
        <div v-if="searchExpand !== undefined"
          class="ml-1 p-1 self-start flex-shrink-0 text-gray-500 hover:text-gray-800 cursor-pointer transition-transform duration-300"
          :class="{
            'rotate-180': searchExpand,
          }" :title="searchExpand ? '折叠搜索' : '展开搜索'" @click="$emit('update:search-expand', !searchExpand)">
          <expand-down-one></expand-down-one>
        </div>
        <div class="ml-8 flex-shrink-0">
          <el-button type="primary" :icon="Search" :loading="loading" @click="$emit('search')">
            查询
          </el-button>
          <el-button type="default" :icon="Refresh" :loading="loading" @click="onReset">
            重置
          </el-button>
        </div>
      </yh-card>

      <!-- tab -->
      <slot v-if="$slots.tab" name="tab"></slot>

      <!-- 内容 -->
      <yh-card class="flex flex-col flex-1 overflow-hidden">
        <div class="flex-1 overflow-hidden">
          <slot></slot>
        </div>

        <!-- 分页 -->
        <div v-if="pageCurrent" class="flex mt-2 justify-end flex-shrink-0 layout-pagination">
          <slot name="pagination">
            <el-pagination :current-page="pageCurrent" :page-size="pageSize" :page-sizes="pageSizes" background small
              layout="sizes, total, prev, pager, next, jumper" :total="Number(pageTotal) || 0"
              @update:current-page="$emit('update:page-current', $event)" @current-change="$emit('search')"
              @size-change="$emit('search')" @update:page-size="$emit('update:page-size', $event)"></el-pagination>
          </slot>
        </div>
      </yh-card>
    </div>
  </yh-page>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import { ElButton, ElPagination } from "element-plus";
import { Search, Refresh, ExpandDownOne } from "@icon-park/vue-next";
import { YhCard, YhPage } from "@yh-element-plus/components";

const props = withDefaults(
  defineProps<{
    /** 高度 */
    pageHeight?: string;
  }>(),
  {
    pageHeight: 'h-screen'
  },
);

const emit = defineEmits<{
  (event: "search"): void;
  (event: "reset"): void;
  (event: "update:page-current", val: typeof props["pageCurrent"]): void;
  (event: "update:page-size", val: typeof props["pageSize"]): void;
  (event: "update:search-expand", val: typeof props["searchExpand"]): void;
}>();

/** 重置 */
const onReset = () => {
  emit("reset");

  if (props.resetSearch) {
    emit("search");
  }
};

/** 防止溢出页面滚动 */
document.body.classList.add("overflow-hidden");

onBeforeUnmount(() => document.body.classList.remove("overflow-hidden"));
</script>

<script lang="ts">
export default {
  name: "YhPageLayout",
};
</script>

<style lang="scss" scoped>
.layout {
  &-head {
    :deep(.el-form-item) {
      margin-bottom: 6px;
    }

    :deep(.el-form) {
      margin-bottom: -6px;
    }
  }

  &-pagination {
    :deep(.el-pagination .el-select .el-input) {
      width: 90px;
    }
  }
}
</style>
