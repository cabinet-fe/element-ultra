---
title: Slider 滑块
lang: zh-CN
---

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值

:::demo 通过设置绑定值自定义滑块的初始值

slider/basic-usage

:::

## 离散值

选项可以是离散的

:::demo 改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

slider/discrete-values

:::

## 带有输入框的滑块

通过输入框设置精确数值

:::demo 设置 `show-input` 属性会在右侧显示一个输入框

slider/slider-with-input-box

:::

## 不同尺寸

::demo

slider/sizes

:::

## 范围选择

支持选择某一数值范围

:::demo 配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

slider/range-selection

:::

## 垂直模式

:::demo 配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

slider/vertical-mode

:::

## 显示标记

:::demo 设置 `marks` 属性可以在滑块上显示标记。

slider/show-marks

:::

## 属性

| 属性                    | 描述                                                          | 类型              | 可选值                     | 默认值     |
| --------------------- | ----------------------------------------------------------- | --------------- | ----------------------- | ------- |
| model-value / v-model | 选中项绑定值                                                      | number          | —                       | 0       |
| min                   | 最小值                                                         | number          | —                       | 0       |
| max                   | 最大值                                                         | number          | —                       | 100     |
| disabled              | 是否禁用                                                        | boolean         | —                       | false   |
| step                  | 步长                                                          | number          | —                       | 1       |
| show-input            | 是否显示输入框，仅在非范围选择时有效                                          | boolean         | —                       | false   |
| show-input-controls   | 在显示输入框的情况下，是否显示输入框的控制按钮                                     | boolean         | —                       | true    |
| size                  | 滑块的大小                                                       | string          | large / default / small | default |
| input-size            | 输入框的大小，如果设置了 `size` 属性，默认值自动取 `size`                        | string          | large / default / small | default |
| show-stops            | 是否显示间断点                                                     | boolean         | —                       | false   |
| show-tooltip          | 是否显示提示信息                                                    | boolean         | —                       | true    |
| format-tooltip        | 格式化提示信息                                                     | function(value) | —                       | —       |
| range                 | 是否开启选择范围                                                    | boolean         | —                       | false   |
| vertical              | 垂直模式                                                        | boolean         | —                       | false   |
| height                | 滑块高度，垂直模式必填                                                 | string          | —                       | —       |
| label                 | 屏幕阅读器标签                                                     | string          | —                       | —       |
| debounce              | 输入防抖延迟，单位毫秒，仅在 `show-input` 为 true 时生效                      | number          | —                       | 300     |
| tooltip-class         | tooltip 的自定义类名                                              | string          | —                       | —       |
| marks                 | 标记， 对象的键类型需为 `number` 且对象的值必须在 `[min, max]`闭区间内，每个标记均可自定义样式 | object          | —                       | —       |

## 事件

| 事件名    | 说明                        | 参数        |
| ------ | ------------------------- | --------- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | val，新状态的值 |
| input  | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发） | val，改变后的值 |
