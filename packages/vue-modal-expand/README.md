# vue-modal-expand

[中文文档](README.zh-CN.md)

Turn any modal component into an command API

## Installation

Install the package via npm, yarn or pnpm:

```bash
npm install vue-modal-expand
# or
yarn add vue-modal-expand
# or
pnpm add vue-modal-expand
```

## Document

### Components

#### VueModalProvider

The root provider component that manages modal state. Must be placed at the root of your application.

#### Hooks

##### useModal(component, args)

Creates a command-style API for a modal component.

Parameters:

- `component`: The modal component to wrap
- `args`: Initial arguments to pass to the modal

Returns:

- show(showArgs): Method to display the modal, returns a promise
- hide(): Method to hide the modal

##### useModalData()

Hook to use inside modal components to access modal state and control methods.

Returns:

- visible: Ref to the visibility state
- args: Ref to the arguments passed to the modal
- show(): Method to show modal
- hide(): Method to hide modal
- resolve(args): Resolve the modal promise
- reject(args): Reject the modal promise

## Examples

### Basic Usage

1. Wrap your app with the provider:

```vue
<!--App.vue -->
<script setup lang="ts">
import { RouterView } from "vue-router";
import { VueModalProvider } from "vue-modal-expand";
</script>

<template>
  <VueModalProvider>
    <RouterView />
  </VueModalProvider>
</template>
```

2. Create a modal component:

```vue
<script lang="ts" setup>
import { useModalData } from "vue-modal-expand";
const { visible, args, resolve, reject } = useModalData();

const handleConfirm = () => {
  hide();
  resolve({
    a: 1,
    b: 2,
    c: 3,
  });
};
</script>

<template>
  <el-dialog v-model="visible" :title="args.title" width="500">
    <span>{{ args.content }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>
```

3. Use the modal command-style:

```vue
<script lang="ts" setup>
import { useModal } from "vue-modal-expand";
import MyModal from "../components/MyModal.vue";

const modalInfo = useModal(MyModal);
const handleClick = () => {
  modalInfo
    .show({
      title: "test title",
      content: "test content. test content. test content.",
    })
    .then((data) => {
      console.log(data);
    });
};
</script>

<template>
  <button @click="handleClick">Open Modal</button>
</template>
```
