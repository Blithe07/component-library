import { useAxios } from "@vueuse/integrations/useAxios";
import { http } from "../index";

import type { AxiosRequestConfig } from "axios";

/**
 * useAxios 再次封装
 * @param url 地址
 * @param config 配置
 * @returns
 */
export function useHttp<T = any>(
  url: string,
  config: AxiosRequestConfig = {},
  options = {
    immediate: true,
  },
) {
  return useAxios<T>(url, config, http, options);
}
