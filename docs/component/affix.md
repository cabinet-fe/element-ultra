---
title: Affix 固钉
lang: zh-CN
---

# Affix 固钉

将页面元素固定在特定可视区域。

## 基础用法

固钉默认固定在页面顶部。

:::demo 通过设置 `offset` 属性来改变吸顶距离，默认值为 0。

affix/basic

:::

## 为 Affix 组件指定容器

通过设置 `target` 属性，让固钉始终保持在容器内， 超过范围则隐藏。

:::demo 请注意容器避免出现滚动条。

affix/target

:::

## 固定 Affix 组件的位置

Affix 组件提供 2 个固定的位置参数 `top` 和 `bottom`。

:::demo 通过设置 `position` 属性来改变固定位置，默认值为 `top` 。

affix/fixed

:::

## 属性

| 属性       | 说明            | 类型     | 可选值          | 默认值 |
| -------- | ------------- | ------ | ------------ | --- |
| offset   | 偏移距离          | number | —            | 0   |
| position | 固钉位置          | string | top / bottom | top |
| target   | 指定容器（CSS 选择器） | string | —            | —   |
| z-index  | 固钉层级          | number | —            | 100 |

## 事件

| 事件名    | 说明           | 回调参数                  |
| ------ | ------------ | --------------------- |
| change | 固钉状态改变时触发的事件 | (value: boolean)      |
| scroll | 滚动时触发的事件     | scroll top 和 fixed 状态 |

## 方法

| 方法名    | 说明       | 回调参数 |
| ------ | -------- | ---- |
| update | 手动更新固钉状态 | —    |

## 插槽

| 插槽名 | 说明      |
| --- | ------- |
| —   | 自定义默认内容 |
