import { ref } from "vue";
import type { Ref } from "vue";
import type { VxeTableInstance, VxeGridListeners } from "vxe-table";

type VxeTableRef = Ref<VxeTableInstance>;

/**
 * 表格多选批量操作
 * @returns
 */
export function useTable<T = string | number>(vxeTable: VxeTableRef) {
  /** 表格选择行ID */
  const selectKeys = ref<T[]>([]) as Ref<T[]>;

  /** 选择变化 */
  const selectChange = (row: { records: Record<string, unknown>[] }) => {
    const key = vxeTable.value.rowConfig?.keyField;

    if (!key) {
      return;
    }

    selectKeys.value = row.records.map((val) => val[key] as T);
  };

  /** 清空选择 */
  const clearSelect = () => {
    selectKeys.value = [];
    vxeTable.value.clearCheckboxRow();
  };

  const gridEvents: VxeGridListeners = {
    checkboxAll: selectChange,
    checkboxChange: selectChange,
  };

  return {
    clearSelect,
    selectKeys,
    gridEvents,
  };
}
