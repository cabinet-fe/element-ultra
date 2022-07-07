<p align="center">Element Ultra - 基于 element-plus 的增强版</p>

- 💪 使用 Vue 3 Composition API 开发
- 🔥 使用 TypeScript 开发

## 历史文档

没有

## 状态: 内部可用, 全力开发中

正处于全力开发和长期维护状态中

## 主题

[查看主题设置](./theme.md)

### 在线运行

暂无

## 文档

[查看](https://cabinet-fe.github.io/element-ultra/)纯中文文档, 没有任何其他语言,
以后可能有, 但那是以后的事情了

## 启动项目

命令

```bash
$ pnpm i
```

安装所有依赖

## 网站预览

命令

```bash
$ pnpm docs:dev
```

启动文档网站, 可以在这里看到所有的组件

## 本地开发

1. 命令

```shell
$ pnpm dev
```

启动本地开发环境

2. 引入你的组件到 `play/src/*.vue` 文件中

> App.vue 文件

```vue
<template>
  <ComponentYouAreDeveloping />
</template>

<script setup lang="ts">
// 确保你开发的组件在 element-ultra/index.ts 被导出
import { ComponentYouAreDeveloping } from 'element-ultra'
</script>
```

开发你的组件

## 生成新的组件

通过命令快捷生成

```bash
$ pnpm gen component-name
```

注意你的组件名应该用中划线拼接小写单词来命名.
组件类型也必须加到 `typings/global.d.ts` 文件中

## 提交模板

命令检查

```bash
pnpm cz
```

示例

```
# [TYPE](SCOPE): [el-component-name] DESCRIPTION#[ISSUE]
# example: feat(components): [el-button] add type for form usage #1234
```

## Licence

必须是 MIT
Element Ultra is open source software licensed as
[MIT](https://github.com/wenhongjie/element-ultra/blob/master/LICENSE).

## 贡献者

人人都是贡献者
特别感谢 element-plus 的贡献者们
