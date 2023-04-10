import { DictsCatalogue } from "./config";
import { http } from "@yh-element-plus/http";
import { ref } from "vue";

/**
 * 词典相关工具函数
 */
class Dicts {
  #dicts: Map<string, Record<string, any>[] | Promise<any>>;

  constructor() {
    this.#dicts = new Map();
  }

  /**
   * 请求地址
   * @param url
   */
  fetch<T = any>(url: string): Promise<T[]> {
    const newUrl =
      url in DictsCatalogue
        ? DictsCatalogue[url as keyof typeof DictsCatalogue]
        : url;

    // 是否已经存在
    const ditct = this.#dicts.get(url);

    if (ditct) {
      return Promise.resolve(ditct);
    }

    const fetchPromise = http.get<T[]>(newUrl).then((res) => {
      if (res.data && Array.isArray(res.data)) {
        this.#dicts.set(url, res.data);
        return res.data;
      }

      return Promise.reject(new Error("fetch error"));
    });

    this.#dicts.set(url, fetchPromise);

    return fetchPromise;
  }

  /**
   * 请求地址
   * @param url
   */
  useFetch<T = any>(url: string, autoFetch = true) {
    /** 加载 */
    const loading = ref(false);
    /** 完成 */
    const isFinished = ref(false);
    /** 错误 */
    const error = ref(false);
    /** 数据, TODO类型还存在问题 */
    const data = ref([]);

    const execute = (fetchUrl: string) => {
      loading.value = true;

      this.fetch<T>(fetchUrl)
        .then((res) => {
          data.value = res as [];
        })
        .catch(() => {
          error.value = true;
        })
        .finally(() => {
          loading.value = false;
          isFinished.value = true;
        });
    };

    if (autoFetch) {
      execute(url);
    }

    return {
      loading,
      isFinished,
      error,
      data,
      execute,
    };
  }

  /**
   * 解析
   * @param data 数据
   * @param value 值
   * @param options 选项
   */
  async analysis(
    url: string,
    value: string | number,
    options: {
      label: string;
      value: string;
    } = {
      label: "dvName",
      value: "dvCode",
    },
  ) {
    let result = "";
    const { label, value: key } = options;

    try {
      await this.fetch<object>(url).then((res) => {
        const item = res.find((val) => val[key as keyof typeof val] === value);
        if (item) {
          result = item[label as keyof typeof item];
        }
      });
    } catch (error) {
      return result;
    }
    return result;
  }
}

export const dicts = new Dicts();
