---
title: 快速开始
lang: zh-CN
---

# 快速开始

本节将介绍如何在项目中使用 Element Ultra。

## 用法

### 完整引入

不要完整引入

#### Volar 支持

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-ultra/global"]
  }
}
```

### 按需导入

您需要使用额外的插件来导入要使用的组件。

#### 自动导入 <el-tag type="primary" style="vertical-align: middle;" effect="dark" size="small">推荐</el-tag>

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

##### Vite

```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// 待完善自定义
export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: []
    }),
    Components({
      resolvers: []
    })
  ]
}
```

## 全局配置

按需引入：

```vue
<template>
  <el-button>按钮</el-button>
</template>

<script>
import { defineComponent } from 'vue'
import { useConfig } from 'element-ultra'

const [store, setStore] = useConfig()
setStore({
  size: 'small'
})
export default defineComponent({
  setup() {
    return {}
  }
})
</script>
```

## 使用 Nuxt.js

我们也可以使用 [Nuxt.js](https://nuxtjs.org)：

<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe src="https://glitch.com/embed/#!/embed/nuxt-with-element?path=nuxt.config.js&previewSize=0&attributionHidden=true" alt="nuxt-with-element on glitch" style="height: 100%; width: 100%; border: 0;"></iframe>
</div>

## 开始使用

您可以从现在起启动您的项目。 对于每个组件的用法，请参考单个组件对应的文档。
