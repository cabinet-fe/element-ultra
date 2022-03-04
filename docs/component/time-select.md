---
title: TimeSelect 时间选择
lang: zh-CN
---

# TimeSelect 时间选择

用于选择或输入日期

可用时间范围是 00:00-23:59

## 固定时间点

提供几个固定的时间点供用户选择

:::demo 使用 `el-time-select` 标签，然后通过`start`、`end`和`step`指定起始时间，结束时间和步长。

time-select/basic

:::

## 时间格式

使用 `format` 属性来控制时间格式 (小时以及分钟)。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

:::warning

注意大小写

:::

:::demo

time-select/time-formats

:::

## 固定时间范围

如果先选中了开始（或结束）时间，则结束（或开始）时间的状态也将会随之改变。

:::demo

time-select/time-range

:::

## 属性

| 属性                    | 说明                                                       | 类型                 | 可选值                                                                                    | 默认值         |
| --------------------- | -------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------- | ----------- |
| model-value / v-model | 选中项绑定值                                                   | string             | —                                                                                      | —           |
| disabled              | 禁用状态                                                     | boolean            | —                                                                                      | false       |
| editable              | 文本框可输入                                                   | boolean            | —                                                                                      | true        |
| clearable             | 是否显示清除按钮                                                 | boolean            | —                                                                                      | true        |
| size                  | 输入框尺寸                                                    | string             | large / default / small                                                                | default     |
| placeholder           | 非范围选择时的占位内容                                              | string             | —                                                                                      | —           |
| name                  | 原生属性                                                     | string             | —                                                                                      | —           |
| effect                | Tooltip theme, built-in theme: `dark` / `light`          | string             | string                                                                                 | light       |
| prefix-icon           | Custom prefix icon component                             | string / Component | —                                                                                      | Clock       |
| clear-icon            | Custom clear icon component                              | string / Component | —                                                                                      | CircleClose |
| start                 | start time                                               | string             | —                                                                                      | 09:00       |
| end                   | end time                                                 | string             | —                                                                                      | 18:00       |
| step                  | time step                                                | string             | —                                                                                      | 00:30       |
| min-time              | minimum time, any time before this time will be disabled | string             | —                                                                                      | 00:00       |
| max-time              | maximum time, any time after this time will be disabled  | string             | —                                                                                      | —           |
| format                | set format of time                                       | string             | see [formats](https://day.js.org/docs/en/display/format#list-of-all-available-formats) | HH:mm       |

## 事件

| 事件名    | 说明                | 回调参数      |
| ------ | ----------------- | --------- |
| change | 用户确认选定的值时触发       | val，组件绑定值 |
| blur   | 在组件 Input 失去焦点时触发 | 组件实例      |
| focus  | 在组件 Input 获得焦点时触发 | 组件实例      |

## 方法

| 方法名   | 说明           | 参数 |
| ----- | ------------ | -- |
| focus | 使 input 获取焦点 | —  |
| blur  | 使 input 失去焦点 | —  |
