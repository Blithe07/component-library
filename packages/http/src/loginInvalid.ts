import { ElMessage } from "element-plus";

/** 重新登录锁 */
let loginLock = false;

/**
 * 未授权提示登录
 */
export function loginInvalid() {
  if (loginLock) {
    return;
  }

  loginLock = true;

  ElMessage({
    message: "系统提示：认证过期，请重新登录",
    type: "warning",
    onClose() {
      const currentWindow = window.parent ?? window;

      localStorage.removeItem("Authorization");

      // 跳转到登录页
      const { pathname } = currentWindow.location;
      currentWindow.location.href = pathname + "#/login";
    },
  });
}
