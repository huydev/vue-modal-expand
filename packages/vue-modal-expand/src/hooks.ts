import { injectLocal, provideLocal } from "@vueuse/core";
import {
  computed,
  markRaw,
  reactive,
  toRef,
  type Component,
  type ComputedOptions,
  type DefineComponent,
  type InjectionKey,
  type MethodOptions,
  type Ref,
} from "vue";

interface ModalMapValue<ArgsType = unknown> {
  id: string;
  component: DefineComponent<any, any, any, ComputedOptions, MethodOptions>;
  visible: boolean;
  initArgs: ArgsType;
  args: ArgsType;
}
interface PromiseMapValue {
  _promise: Promise<unknown>;
  _resolve: (args?: unknown) => void;
  _reject: (args?: unknown) => void;
}
type ModalStateType = ReturnType<typeof useModalProvider>;

export const ModalStateKey = Symbol(
  "ModalState"
) as InjectionKey<ModalStateType>;
export const ModalUidKey = Symbol("ModalUid") as InjectionKey<string>;

export function useModalProvider() {
  let uid = 0;
  const DIALOG_FLAG = Symbol("__VUE_DIALOG_UID__");
  const store = reactive(new Map<string, ModalMapValue>());
  const promiseStore = new Map<string, PromiseMapValue>();
  const register = (id: string, modal: any, initArgs: unknown) => {
    if (!store.has(id)) {
      modal[DIALOG_FLAG] = id;
      store.set(id, {
        id,
        component: markRaw(modal),
        visible: false,
        initArgs,
        args: undefined,
      });
    } else {
      store.get(id)!.initArgs = initArgs;
    }
  };
  const show = (id: string, args?: unknown) => {
    const modalInfo = store.get(id);
    if (modalInfo) {
      if (args) {
        modalInfo.args = {
          ...(typeof modalInfo.initArgs === "object" &&
          modalInfo.initArgs !== null
            ? modalInfo.initArgs
            : {}),
          ...(typeof args === "object" ? args : {}),
        };
      } else {
        modalInfo.args = {
          ...(typeof modalInfo.initArgs === "object" &&
          modalInfo.initArgs !== null
            ? modalInfo.initArgs
            : {}),
        };
      }
      modalInfo.visible = true;
    }
  };
  const hide = (id: string) => {
    const modalInfo = store.get(id);
    if (modalInfo) {
      modalInfo.visible = false;
    }
  };
  const remove = (id: string) => {
    store.delete(id);
    promiseStore.delete(id);
  };
  const getModalId = (modal: any) => {
    if (!modal[DIALOG_FLAG]) {
      modal[DIALOG_FLAG] = `__VUE_DIALOG__${uid++}`;
    }
    return modal[DIALOG_FLAG];
  };
  const modalList = computed(() => {
    return Array.from(store.values());
  });
  provideLocal(ModalStateKey, {
    store,
    promiseStore,
    register,
    show,
    hide,
    remove,
    getModalId,
    modalList,
  });
  return {
    store,
    promiseStore,
    register,
    show,
    hide,
    remove,
    getModalId,
    modalList,
  };
}
export function useModal<D = unknown>(modal: Component, initArgs?: D) {
  const modalState = injectLocal(ModalStateKey);
  const modalId = modalState?.getModalId(modal);
  const isRegistered = modalState?.store.has(modalId);
  // Early initialization
  if (!isRegistered) {
    modalState?.register(modalId, modal, initArgs);
  }
  const show = (showArgs?: D) => {
    // clean up old promise
    if (modalState?.promiseStore.has(modalId)) {
      modalState?.promiseStore.delete(modalId);
    }
    let resolve!: (args?: unknown) => void;
    let reject!: (args?: unknown) => void;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    modalState?.promiseStore.set(modalId, {
      _promise: promise,
      _resolve: resolve,
      _reject: reject,
    });
    modalState!.show(modalId, showArgs)!;
    return modalState!.promiseStore.get(modalId)!._promise;
  };
  const hide = () => {
    modalState?.hide(modalId);
  };
  const remove = () => {
    modalState?.remove(modalId);
  };
  return {
    store: modalState?.store,
    show,
    hide,
    remove,
  };
}
export function useModalData<D = unknown>() {
  const modalState = injectLocal(ModalStateKey);
  const modalId = injectLocal(ModalUidKey, "");
  const modalInfo = modalState!.store.get(modalId)!;
  const show = (args?: D) => {
    modalState?.show(modalId, args);
  };
  const hide = () => {
    modalState?.hide(modalId);
  };
  const remove = () => {
    modalState?.remove(modalId);
  };
  const resolve = (args?: unknown) => {
    modalState?.promiseStore.get(modalId)?._resolve(args);
  };
  const reject = (args?: unknown) => {
    modalState?.promiseStore.get(modalId)?._reject(args);
  };
  return {
    visible: toRef(modalInfo, "visible"),
    args: toRef(modalInfo, "args") as Ref<D>,
    show,
    hide,
    remove,
    resolve,
    reject,
  };
}
