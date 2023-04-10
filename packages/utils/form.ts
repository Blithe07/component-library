/**
 * 表单校验
 * @param message
 * @param trigger
 * @returns
 */
export function getFormRule(
  message: string,
  trigger: "blur" | "change" = "blur",
) {
  return {
    required: true,
    message,
    trigger,
  };
}
