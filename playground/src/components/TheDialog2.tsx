import { defineComponent } from "vue";
import { useModalData } from "vue-modal-expand";

export const TheDialog2 = defineComponent({
  name: "TheDialog2",
  setup: () => {
    const { visible, args, hide, resolve } = useModalData();
    const handleConfirm = () => {
      hide();
      resolve({
        a: "a",
        b: "b",
        c: "c",
      });
    };
    return () => (
      <el-dialog v-model={visible.value} title={args.value.title} width="500">
        {{
          default: () => <span>{args.value.content}</span>,
          footer: () => (
            <div class="dialog-footer">
              <el-button>Cancel</el-button>
              <el-button type="primary" onClick={handleConfirm}>
                Confirm
              </el-button>
            </div>
          ),
        }}
      </el-dialog>
    );
  },
});
