---
title: Empty 空状态
lang: zh-CN
---

# Empty 空状态

空状态时的占位提示。

## 基础用法

:::demo

empty/basic-usage

:::

## 自定义图片

通过设置 `image` 属性传入图片 URL。

:::demo

empty/custom-image

:::

## 图片尺寸

Use `image-size` prop to control image size.

:::demo

empty/image-size

:::

## Bottom content

使用默认插槽可在底部插入内容。

:::demo

empty/bottom-content

:::

## 自定义样式

您可以为empty组件设置自定义样式。 使用 `css/scss` 语言来更改全局或局部颜色。 我们设置了一些全局颜色变量： `--el-empty-fill-color-0`, `--el-empty-fill-color-1`, `--el-empty-fill-color-2`, ..., `--el-empty-fill-color-9` 您可以使用类似于：`:root { --el-empty-fill-color-0: red; --el-empty-fill-color-1: blue; }`. 但通常，如果你想要更改样式，你需要更改所有颜色，因为这些颜色是一个组合。

### 默认变量

| 变量                      | 颜色                    |
| ----------------------- | --------------------- |
| --el-empty-fill-color-0 | var(--el-color-white) |
| --el-empty-fill-color-1 | #fcfcfd               |
| --el-empty-fill-color-2 | #f8f9fb               |
| --el-empty-fill-color-3 | #f7f8fc               |
| --el-empty-fill-color-4 | #eeeff3               |
| --el-empty-fill-color-5 | #edeef2               |
| --el-empty-fill-color-6 | #e9ebef               |
| --el-empty-fill-color-7 | #e5e7e9               |
| --el-empty-fill-color-8 | #e0e3e9               |
| --el-empty-fill-color-9 | #d5d7de               |

## Empty 属性

| 属性          | 说明       | 类型     | 可选值 | 默认值 |
| ----------- | -------- | ------ | --- | --- |
| image       | 图片地址     | string | —   | —   |
| image-size  | 图片大小（宽度） | number | —   | —   |
| description | 描述       | string | —   | —   |

## Empty 插槽

| 插槽名         | 描述说明    |
| ----------- | ------- |
| default     | 自定义底部内容 |
| image       | 自定义图片   |
| description | 自定义描述   |
