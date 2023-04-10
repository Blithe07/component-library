import axios from "axios";
import {
  interceptorsRequest,
  interceptorsResponse,
  requestReject,
} from "./src/interceptors";

const http = axios.create({
  // 基础路径
  baseURL: "",
  // 超时
  timeout: 1000 * 60 * 15,
  // 头部
  headers: {
    Authorization: "",
  },
  // 显示加载
  loading: false,
  // 显示成功消息
  showSuccessMsg: false,
  // 显示错误
  showErrorMsg: true,
});

// 请求拦截
http.interceptors.request.use(interceptorsRequest, (error) => {
  return Promise.reject(error);
});

// 返回拦截
http.interceptors.response.use(interceptorsResponse, requestReject);

export { http };
export * from "./src/useHttp";

export type { AxiosRequestConfig as RequestConfig } from "axios";
