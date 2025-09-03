# vue-modal-expand

[English](README.md)

将任何模态框组件转换为命令式 API

## 安装

通过 npm、yarn 或 pnpm 安装包：

```bash
npm install vue-modal-expand
# 或
yarn add vue-modal-expand
# 或
pnpm add vue-modal-expand
```

## 文档

### 组件

#### VueModalProvider

根提供者组件，用于管理模态框状态。必须放置在应用程序的根目录。

### 钩子

#### useModal(component)

为模态框组件创建命令式 API。

参数：

- `component`: 要包装的模态框组件

返回：

- show(args): 显示模态框的方法，返回一个 Promise
- hide(): 隐藏模态框的方法

#### useModalData()

在模态框组件内部使用的钩子，用于访问模态框状态和控制方法。

返回：

- visible: 可见性状态的 Ref
- args: 传递给模态框的参数的 Ref
- show(args): 显示模态框的方法
- hide(): 隐藏模态框的方法
- resolve(args): 解决模态框 Promise
- reject(args): 拒绝模态框 Promise

## 示例

### 基本用法

1. 用提供者包装应用：

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

2. 创建模态框组件：

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
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
```

3. 命令式使用模态框：

```vue
<script lang="ts" setup>
import { useModal } from "vue-modal-expand";
import MyModal from "../components/MyModal.vue";

const modalInfo = useModal(MyModal);
const handleClick = () => {
  modalInfo
    .show({
      title: "测试标题",
      content: "测试内容。测试内容。测试内容。",
    })
    .then((data) => {
      console.log(data);
    });
};
</script>

<template>
  <button @click="handleClick">打开模态框</button>
</template>
```
