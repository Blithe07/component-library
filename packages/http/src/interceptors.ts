import { ElMessage, ElLoading } from "element-plus";
import {
  downloadFile,
  previewFile,
  getFileName,
  downloadFial,
} from "./fileHandle";
import { loginInvalid } from "./loginInvalid";

import type { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * 请求拦截器
 */
export function interceptorsRequest(
  config: AxiosRequestConfig,
): AxiosRequestConfig | Promise<AxiosRequestConfig> {
  /** 需要显示加载 */
  if (config.loading) {
    config.loadingId = ElLoading.service();
  }

  // 设置token
  (config as any).headers.Authorization = localStorage.getItem("Authorization");

  /** 如果需要下载或者预览 */
  if (config.download || config.preview) {
    config.responseType = "blob";
  }

  return config;
}

/**
 * 返回拦截器
 */
export function interceptorsResponse({
  data,
  config,
  headers,
}: AxiosResponse<any, any>): any {
  // 关闭加载状态
  if (config.loadingId) {
    config.loadingId.close();
  }

  /** 如果返回数据式blob类型 */
  if (data instanceof Blob) {
    if (data.type === "application/json") {
      downloadFial(data);
    } else {
      if (config.download) {
        // 如果需要下载
        const fileName = getFileName(headers["content-disposition"]);

        downloadFile(data, fileName);
        return data;
      }

      // 如果需要预览
      if (config.preview) {
        previewFile(data);
        return data;
      }
    }

    return;
  }

  const { content, msg, type: status, code } = data;
  const message = content || msg;

  // 接口返回正常
  if (status === "success" || code === "200") {
    if (config.showSuccessMsg && message) {
      ElMessage.success(message);
    }

    return data;
  }

  if (config.showErrorMsg) {
    ElMessage.error(message);
  }

  /** 登录失效 */
  if ([401, "401"].includes(status)) {
    loginInvalid();
  }

  return Promise.reject(new Error(message));
}

/**
 * 失败回调
 */
export function requestReject(error: {
  message: string;
  config: AxiosRequestConfig;
}): Promise<any> {
  const { message, config = {} } = error;

  config?.loadingId?.close();

  if (config.showErrorMsg) {
    // 需要显示错误
    ElMessage.error(message || "请求超时或服务器错误!");
  }

  return Promise.reject(error);
}
