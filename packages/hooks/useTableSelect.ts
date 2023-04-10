import { ref, computed } from "vue";
import type { Ref } from "vue";

/**
 * 表格多选批量操作
 * @returns
 */
export function useTableSelect<T extends object, U extends keyof T>(key: U) {
  /** 表格选择行ID */
  const selectData = ref<T[U][]>([]) as Ref<T[U][]>;
  /** 选择表格数据 */
  const selectDataObj = ref<T[]>([]) as Ref<T[]>;
  /** 多选可用(至少选择了一行数据) */
  const selectAvailable = computed(() => selectData.value.length > 0);

  /** 选择变化 */
  const selectChange = (row: { records: T[] }) => {
    selectData.value = row.records.map((val) => val[key]);
    selectDataObj.value = [...row.records];
  };

  /** 清空选择 */
  const clearSelect = () => {
    selectData.value = [];
    selectDataObj.value = [];
  };

  return {
    selectData,
    selectDataObj,
    selectAvailable,
    selectChange,
    clearSelect,
  };
}

// function useTest<T extends object, U extends keyof T>(key: U) {
//   const data: T[U][] = [] as T[U][];

//   return {
//     data,
//   };
// }

// const { data } = useTest<{ age: number; name: string }, "age">("age");
