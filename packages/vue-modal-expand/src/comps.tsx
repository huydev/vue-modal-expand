import { injectLocal, provideLocal } from "@vueuse/core";
import { defineComponent, onUnmounted, type PropType } from "vue";
import { ModalStateKey, ModalUidKey, useModalProvider } from "./hooks";

export const VueModalProvider = defineComponent({
  name: "VueModalProvider",
  setup(_, ctx) {
    const { modalList } = useModalProvider();
    return () => (
      <>
        {ctx.slots.default?.()}
        {modalList.value.map((modal) => (
          <VueModalWrapper id={modal.id} key={modal.id}>
            <modal.component />
          </VueModalWrapper>
        ))}
      </>
    );
  },
});
export const VueModalWrapper = defineComponent({
  name: "VueModalWrapper",
  props: {
    id: {
      type: String as PropType<string>,
      default: "",
    },
  },
  setup(props, ctx) {
    const modalState = injectLocal(ModalStateKey);
    provideLocal(ModalUidKey, props.id);
    onUnmounted(() => {
      if (props.id) {
        modalState?.remove(props.id);
      }
    });
    return () => ctx.slots.default?.();
  },
});
