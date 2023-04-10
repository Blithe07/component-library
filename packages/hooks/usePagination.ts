import { reactive } from "vue";

const requestBaseParams = {
  /** 当前页大小 */
  current: 1,
  /** 页大小 */
  size: 20,
};

/**
 * 分页参数初始化
 * @param params
 * @returns
 */
export function usePagination<T extends object>(params: T) {
  return reactive({
    ...requestBaseParams,
    ...params,
  });
}
