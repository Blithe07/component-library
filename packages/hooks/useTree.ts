/**
 * el-tree hook
 */
import { computed, ref, watch } from "vue";

import type { Ref } from "vue";
import type { ElTree } from "element-plus";

type ElTreeRef = Ref<InstanceType<typeof ElTree>>;

/**
 * 获取树结构指定字段
 * @param data
 * @param key
 * @param children
 * @todo 类型还需要完善
 */
const getTreeById = (
  data: any[],
  key = "id",
  children = "children",
): (string | number)[] => {
  return data.reduce((pre, current) => {
    pre.push(current[key]);

    if (current.children) {
      return [...pre, ...getTreeById(current[children], key, children)];
    }

    return pre;
  }, [] as (string | number)[]);
};

/**
 * 树结构选择
 * @param treeRef
 * @param data
 */
export const useTree = (treeRef: ElTreeRef) => {
  /** 当前选择的id */
  const checkedKeys = ref<(string | number)[]>([]);

  /** 树结构id */
  const treeKeys = ref<typeof checkedKeys.value>([]);

  /** 是否全选 */
  const isCheckAll = computed(
    () => checkedKeys.value.length === treeKeys.value.length,
  );

  /** 全选 */
  const checkAll = () => {
    treeRef.value.setCheckedKeys(treeKeys.value);
  };

  /** 取消所有选择 */
  const clearChecked = () => {
    treeRef.value.setCheckedKeys([]);
  };

  /** 选择变化 */
  const checkChange = () => {
    checkedKeys.value = treeRef.value.getCheckedKeys();
  };

  // 监听数据变化
  watch(
    () => treeRef.value.data,
    () => {
      const { children } = treeRef.value.props;
      const nodeKey = treeRef.value.nodeKey;

      treeKeys.value = getTreeById(treeRef.value.data, nodeKey, children);
    },
  );

  /** 过滤 */
  const filterText = ref("");

  /** 过滤方法 */
  const filterMethod = (value: string, data: Record<string, string>) => {
    if (!value) {
      return true;
    }

    const { label } = treeRef.value.props;

    return data[label as string]?.includes(value);
  };

  watch(filterText, (val) => {
    treeRef.value?.filter(val);
  });

  return {
    checkedKeys,
    treeKeys,
    isCheckAll,
    filterText,
    filterMethod,
    checkAll,
    clearChecked,
    checkChange,
  };
};
