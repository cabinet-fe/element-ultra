---
title: Button 按钮
lang: zh-CN
---

# Button 按钮

常用的操作按钮。

## 改进

1. 移除 auto-insert-space 属性, 这个属性并没有什么用
2. 移除了 color 属性, 大部分时候, 这个属性也没什么用, 因为颜色是可配的

## 基础用法

:::demo 使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

button/basic

:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

:::demo 使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

button/disabled

:::

## 文字按钮

没有边框和背景色的按钮。

:::demo

button/text

:::

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

:::demo 使用 `icon` 属性来为按钮添加图标。 你可以在 Element Ultra icon 组件里找到 Element Ultra 提供的内置图标。 通过向右方添加`<i>`标签来添加图标， 你也可以使用自定义图标。

button/icon

:::

## 按钮组

通过按钮组来组合一系列相似的操作。

:::demo 使用标签 `<el-button-group>` 来给按钮分组。

button/group

:::

## 加载中

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 `true` 来显示加载中状态。

:::tip

您可以使用 `loading` 插槽或 `loadingIcon`属性自定义您的 loading 图标

ps: `loading` 插槽优先级高于`loadingIcon`属性

:::

:::demo

button/loading

:::

## 各种尺寸的按钮

除了默认尺寸外，Button 组件还提供了三种额外的尺寸供您在不同的场景中选择。

:::demo 使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值。

button/size

:::

## Button 属性

| 属性         | 说明                  | 类型               | 可选值                                                | 默认值  |
| ------------ | --------------------- | ------------------ | ----------------------------------------------------- | ------- |
| size         | 尺寸                  | string             | large / default /small                                | —       |
| type         | 类型                  | string             | primary / success / warning / danger / info / default | default |
| text         | 是否为文本按钮        | boolean            | -                                                 | false       |
| bg         | 是否显示文字按钮背景色        | boolean            | -                                                 | false      |
| link         | 是否为链接按钮        | boolean            | -                                                 | false      |
| plain        | 是否为朴素按钮        | boolean            | —                                                     | false   |
| round        | 是否为圆角按钮        | boolean            | —                                                     | false   |
| circle       | 是否为圆形按钮        | boolean            | —                                                     | false   |
| loading      | 是否为加载中状态      | boolean            | —                                                     | false   |
| loading-icon | 自定义加载中图标      | string / Component | —                                                     | Loading |
| disabled     | 是否为禁用状态        | boolean            | —                                                     | false   |
| icon         | 自定义图标            | string / Component | —                                                     | —       |
| autofocus    | 原生 `autofocus` 属性 | boolean            | —                                                     | false   |
| native-type  | 原生 type 属性        | string             | button / submit / reset                               | button  |

## Button 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| —       | 自定义默认内容   |
| loading | 自定义加载中组件 |

## Button Group 属性

| 属性 | 说明                         | 类型   | 可选值                                | 默认值  |
| ---- | ---------------------------- | ------ | ------------------------------------- | ------- |
| size | 用于控制该按钮组内按钮的大小 | string | large / small                         | —       |
| type | 用于控制该按钮组内按钮的类型 | string | primary / success / warning / default | default |

## Button Group 插槽

| 插槽名 | 说明             | 子标签 |
| ------ | ---------------- | ------ |
| -      | 自定义按钮组内容 | Button |
