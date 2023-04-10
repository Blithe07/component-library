// 扩展axios自定义属性
import "axios";
import { ElLoading } from "element-plus";

import type { AxiosResponse } from "axios";

declare module "axios" {
  export interface HeadersDefaults {
    AUTHORIZATION?: string;
  }

  export interface AxiosRequestConfig {
    /** 是否显示加载，默认值: `false` */
    loading?: boolean;
    /** loadingID不需要指定 */
    loadingId?: ReturnType<typeof ElLoading["service"]>;
    /** 显示成功消息 */
    showSuccessMsg?: boolean;
    /** 显示错误 */
    showErrorMsg?: boolean;
    /** 下载 */
    download?: boolean;
    /** 预览 */
    preview?: boolean;
  }

  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    delete<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    head<T = any>(
      url: string,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>>;
  }
}
