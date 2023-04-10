import { ElMessage } from "element-plus";

/**
 * 获取返回文件名
 * @param header
 * @param key
 * @returns
 */
export function getFileName(header: string, key = "filename") {
  const disMatch = header.match(`${key}=(.+)`);

  if (!disMatch) {
    return "";
  }

  const [, fileName] = disMatch;

  return decodeURIComponent(fileName);
}

/**
 * 下载文件
 * @param data
 * @param disposition
 */
export function downloadFile(data: Blob, fileName: string) {
  if (!fileName) {
    return;
  }

  const url = window.URL.createObjectURL(data);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

/**
 * 预览文件
 * @param data
 * @param disposition
 * @param newTab
 */
export function previewFile(data: Blob) {
  const url = window.URL.createObjectURL(data);

  window.open(url);
  window.URL.revokeObjectURL(url);
}

/**
 * 下载错误提示
 */
export function downloadFial(data: Blob) {
  const b = new Blob([data], {
    type: data.type,
  });

  const fr = new FileReader();

  fr.onload = (e) => {
    try {
      const { content = "下载错误", type } =
        JSON.parse(e.target?.result as string) || {};

      if (type !== "success") {
        ElMessage.error(content);
      }
    } catch (error) {
      // error;
    }
  };

  fr.readAsText(b);
}
