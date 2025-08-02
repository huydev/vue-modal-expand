import { defineComponent } from "vue";
import { useModalData } from "vue-modal-expand";

export const TheDialog = defineComponent({
  name: "TheDialog",
  setup: () => {
    const { visible, args, hide, resolve } = useModalData();
    const handleConfirm = () => {
      hide();
      resolve({
        a: 1,
        b: 2,
        c: 3,
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
