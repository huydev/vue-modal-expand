import { defineComponent, ref, watch } from "vue";
import { useModalData } from "vue-modal-expand";

export const TheDialog = defineComponent({
  name: "TheDialog",
  setup: () => {
    const { visible, args, hide, resolve } = useModalData();
    const form = ref({
      name: undefined,
      time: undefined,
    });
    const handleConfirm = () => {};
    const handleOpen = () => {
      console.log("args", args.value);
      if (args.value) {
        form.value.name = args.value.name;
        form.value.time = args.value.time;
      }
    };
    return () => (
      <el-dialog
        v-model={visible.value}
        title={"默认标题"}
        width="500"
        onOpen={handleOpen}
      >
        {{
          default: () => (
            <el-form>
              <el-form-item label="Activity name">
                <el-input v-model={form.value.name} />
              </el-form-item>
              <el-form-item label="Activity time">
                <el-input v-model={form.value.time} />
              </el-form-item>
            </el-form>
          ),
          footer: () => (
            <div class="dialog-footer">
              <el-button>取消</el-button>
              <el-button type="primary" onClick={handleConfirm}>
                确认
              </el-button>
            </div>
          ),
        }}
      </el-dialog>
    );
  },
});
