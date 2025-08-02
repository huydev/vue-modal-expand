import { defineComponent } from "vue";
import { useModal } from "vue-modal-expand";
import { TheDialog } from "@/components/TheDialog";

export const TheTest = defineComponent({
  name: "TheTest",
  setup: () => {
    const modalInstance = useModal(TheDialog);
    const handleClick = () => {
      modalInstance
        .show({
          title: "测试弹窗",
          content: "尽快落地实施地理空间",
        })
        .then((data) => {
          console.log(data);
        });
    };
    return () => (
      <div>
        <el-button onClick={handleClick}>弹窗</el-button>
      </div>
    );
  },
});
