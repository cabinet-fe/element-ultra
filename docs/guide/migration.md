---
title: 迁移
lang: zh-CN
---

# 迁移

[此指南](https://github.com/element-plus/element-plus/discussions/5658)将帮助您从 Element UI 2.x 升级到 Element Ultra。

## Vue 3 迁移构建

使用 Element Ultra 与 Vue 3 迁移构建时可能遇到一些问题。 有些组件依赖于 Vue 3 内部 API。 尝试全局或将你项目中每个组件的 [compatConfig](https://v3.vuejs.org/guide/migration/migration-build.html#per-component-config) 调整为 `3`。

<style scoped>
  details {
    margin-top: 8px;
  }
</style>
