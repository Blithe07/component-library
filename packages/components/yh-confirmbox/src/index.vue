<script lang="ts">
import { h, defineComponent, useSlots } from "vue";
import { ElMessageBox } from "element-plus";

export default defineComponent({
  name: "YhConfirmbox",
  props: {
    type: {
      type: String,
      default: "warning",
    },
    title: {
      type: String,
      default: "提示",
    },
    content: {
      type: String,
      default: "是否删除所选数据？",
    },
    confirmButtonText: {
      type: String,
      default: undefined,
    },
    cancelButtonText: {
      type: String,
      default: undefined,
    },
  },
  emits: ["confirm"],
  render() {
    const slot = useSlots();
    const [defaultSlot = ""] = slot?.default?.() ?? [];

    const child = h(defaultSlot, {
      onClick: () => {
        ElMessageBox.confirm(this.content, this.title, {
          confirmButtonText: this.confirmButtonText,
          cancelButtonText: this.cancelButtonText,
          type: this.type as "",
        }).then(() => {
          this.$emit("confirm");
        });
      },
    });

    return child;
  },
});
</script>
