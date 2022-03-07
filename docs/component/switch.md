---
title: Switch 开关
lang: zh-CN
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

:::demo 绑定 `v-model` 到一个 `Boolean` 类型的变量。 可以使用 `active-color` 属性与 `inactive-color` 属性来设置开关的背景色。

switch/basic

:::

## 尺寸

:::demo

switch/sizes

:::

## 文字描述

使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。 使用 `inline-prompt` 属性来控制文本是否显示在点内。

:::demo 使用`active-text`属性与`inactive-text`属性来设置开关的文字描述。

switch/text-description

:::

## 显示自定义图标

:::tip

使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 您可以传递组件名称的字符串（提前注册）或组件本身是一个 SVG Vue 组件。 Element Ultra 提供了一组图标，您可以在 [icon component](/component/icon) 查看。

:::

:::demo 使用 `inactive-icon` 和 `active-icon` 属性来添加图标。 使用 `inline-prompt` 属性来控制图标显示在点内。

switch/custom-icons

:::

## 扩展的 value 类型

:::demo 设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。 接受`Boolean`, `String`或`Number`类型的值。

switch/extended-value-types

:::

## 禁用状态

:::demo 设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。

switch/disabled

:::

## 加载状态

:::demo 设置`loading`属性，接受一个`Boolean`，设置`true`即加载中状态。

switch/loading

:::

## 阻止切换

:::demo 设置`beforeChange`属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。

switch/prevent-switching

:::

## 属性

| 属性                    | 说明                                                          | 类型                        | 可选值                     | 默认值     |
| --------------------- | ----------------------------------------------------------- | ------------------------- | ----------------------- | ------- |
| model-value / v-model | 绑定值，必须等于 `active-value` 或 `inactive-value`，默认为 `Boolean` 类型 | boolean / string / number | —                       | —       |
| disabled              | 是否禁用                                                        | boolean                   | —                       | false   |
| loading               | 是否显示加载中                                                     | boolean                   | —                       | false   |
| size                  | switch 的大小                                                  | string                    | large / default / small | default |
| width                 | switch 的宽度                                                  | number                    | —                       | 40      |
| inline-prompt         | 无论图标或文本是否显示在点内，只会呈现文本的第一个字符                                 | boolean                   | —                       | false   |
| active-icon           | switch 状态为 `on` 时所显示图标，设置此项会忽略 `active-text`                | string / Component        | —                       | —       |
| inactive-icon         | switch 状态为 `off` 时所显示图标，设置此项会忽略 `inactive-text`             | string / Component        | —                       | —       |
| active-text           | switch 打开时的文字描述                                             | string                    | —                       | —       |
| inactive-text         | switch 的状态为 `off` 时的文字描述                                    | string                    | —                       | —       |
| active-value          | switch 状态为 `on` 时的值                                         | boolean / string / number | —                       | true    |
| inactive-value        | switch的状态为 `off` 时的值                                        | boolean / string / number | —                       | false   |
| active-color          | switch的值为 `on` 时的颜色                                         | string                    | —                       | #409EFF |
| inactive-color        | switch的值为 `off` 的颜色                                         | string                    | —                       | #C0CCDA |
| border-color          | switch 边框颜色                                                 | string                    | —                       | —       |
| name                  | switch 对应的 name 属性                                          | string                    | —                       | —       |
| validate-event        | 改变 switch 状态时是否触发表单的校验                                      | boolean                   | —                       | true    |
| before-change         | switch 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 reject 则停止切换  | function                  | —                       | —       |

## 事件

| 事件名    | 说明                  | 回调参数      |
| ------ | ------------------- | --------- |
| change | switch 状态发生变化时的回调函数 | val，新状态的值 |

## 方法

| 方法    | 说明            | 参数 |
| ----- | ------------- | -- |
| focus | 使 Switch 获取焦点 | —  |
