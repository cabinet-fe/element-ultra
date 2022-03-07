---
title: Icon 图标
lang: zh-CN
---

# Icon 图标

Element Ultra 提供了一套常用的图标集合。

## 使用图标

- 如果你想像用例一样**直接使用**，你需要[全局注册组件](https://v3.vuejs.org/guide/component-registration.html#global-registration)，才能够直接在项目里使用。

- 如若想查看所有可用的 SVG 图标请查阅 [@element-plus/icons-vue](https://unpkg.com/browse/@element-plus/icons-vue@latest/dist/es/) 和 [element-plus-icons](https://github.com/element-plus/element-plus-icons) 的源代码或当前页的 [Icon Collection](#icons-collection)

- CDN 导入和 [自动导入](https://github.com/antfu/unplugin-icons) 正在开发中。

## 安装

### 使用包管理器

```shell
# 选择一个你喜欢的包管理器

# NPM
$ npm install @element-plus/icons-vue
# Yarn
$ yarn add @element-plus/icons-vue
# pnpm
$ pnpm install @element-plus/icons-vue
```

## 基础用法

:::warning

由于 HTML 标准已经定义了一个名为 [menu](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu) 的标签，如果你注册的 `Menu` 无法正常工作，则需要使用别名来渲染图标。

:::

```vue
<!-- Use el-icon to provide attributes to SVG icon -->
<template>
  <div>
    <el-icon :size="size" :color="color">
      <edit></edit>
    </el-icon>
    <!-- Or use it independently without derive attributes from parent -->
    <edit></edit>
  </div>
</template>
```

<script setup>
import { Edit, Share, Delete, Search, Loading } from '@element-plus/icons-vue'
</script>

<ElRow>
  <div>
    <ElIcon :size="30">
      <Edit />
    </ElIcon>
    <Edit />
  </div>
</ElRow>

## 结合 el-icon 使用

`el-icon` 为原始的 SVG 图标提供额外的属性，更多细节详见结尾。

```vue
<template>
  <p>
    with extra class <b>is-loading</b>, your icon is able to rotate 360 deg in 2
    seconds, you can also override this
  </p>
  <el-icon :size="20">
    <edit />
  </el-icon>
  <el-icon color="#409EFC" class="no-inherit">
    <share />
  </el-icon>
  <el-icon>
    <delete />
  </el-icon>
  <el-icon class="is-loading">
    <loading />
  </el-icon>
  <el-button type="primary">
    <el-icon style="vertical-align: middle;">
      <search />
    </el-icon>
    <span style="vertical-align: middle;"> Search </span>
  </el-button>
</template>
```

<ElRow>
  <p>
    通过添加额外的类名 <b>is-loading</b>，你的图标就可以在 2 秒内旋转 360 度，但让你也可以自己改写想要的动画。
  </p>
  <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
    <ElIcon :size="20">
      <Edit />
    </ElIcon>
    <ElIcon color="#409EFC" class="no-inherit">
      <Share />
    </ElIcon>
    <ElIcon>
      <Delete />
    </ElIcon>
    <ElIcon class="is-loading">
      <Loading />
    </ElIcon>
    <ElButton type="primary">
      <ElIcon style="vertical-align: middle; color: #fff;">
        <Search />
      </ElIcon>
      <span style="vertical-align: middle;">搜索</span>
    </ElButton>
  </div>
</ElRow>

## 直接使用 SVG 图标

```vue
<template>
  <div style="font-size: 20px;">
    <!-- Since svg icons do not carry any attributes by default -->
    <!-- You need to provide attributes directly -->
    <edit style="width: 1em; height: 1em; margin-right: 8px;" />
    <share style="width: 1em; height: 1em; margin-right: 8px;" />
    <delete style="width: 1em; height: 1em; margin-right: 8px;" />
    <search style="width: 1em; height: 1em; margin-right: 8px;" />
  </div>
</template>
```

<ElRow>
  <div style="font-size: 20px;">
    <!-- Since svg icons do not carry any attributes by default -->
    <!-- You need to provide attributes directly -->
    <Edit style="width: 1em; height: 1em; margin-right: 8px;" />
    <Share style="width: 1em; height: 1em; margin-right: 8px;" />
    <Delete style="width: 1em; height: 1em; margin-right: 8px;" />
    <Search style="width: 1em; height: 1em; margin-right: 8px;" />
  </div>
</ElRow>

## 图标集合

:::tip

只要你安装了图标组件库，**即可在任意版本中使用 SVG 图标**

**您可以点击图标复制代码**

:::

<IconList />

## Icon 属性

| 属性    | 说明                    | 类型                               | 可选值    | 默认值                        |
| ----- | --------------------- | -------------------------------- | ------ | -------------------------- |
| color | svg 的 fill 颜色         | Pick\<CSSProperties, 'color'\> | -      | inherit                    |
| size  | SVG 图标的大小，size x size | number/                          | string | -                | inherit |

## Icon 插槽

| 名称 | 说明      |
| -- | ------- |
| —  | 自定义默认内容 |
