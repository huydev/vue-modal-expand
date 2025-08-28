import { defineComponent } from "vue";
import { useModal } from "vue-modal-expand";
import { TheDialog } from "@/components/TheDialog";

export const TheTest = defineComponent({
  name: "TheTest",
  setup: () => {
    const modalInstance = useModal(TheDialog);
    const handleClick = () => {
      modalInstance.show({
        id: "a1",
        name: "1111",
      });
    };
    const handleEdit = () => {
      modalInstance.show({
        id: "a2",
        name: "2222",
        time: "的艰苦拉萨独立的思考",
      });
    };
    return () => (
      <div>
        <el-button onClick={handleClick}>新增</el-button>
        <el-button onClick={handleEdit}>编辑</el-button>
      </div>
    );
  },
});
