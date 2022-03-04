---
title: Popover 气泡卡片
lang: zh-CN
---

# Popover 气泡卡片

## 基础用法

与Tooltip相似，Popover也是基于`ElPopper`的构建。 因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

:::demo The `trigger` attribute is used to define how popover is triggered: `hover`, `click`, `focus` or `contextmenu` . If you want to manually controll it, you can set `v-model:visible`.

popover/basic-usage

:::

## 虚拟触发

像 Tooltip一样，Popover 可以由虚拟元素触发，这个功能就很适合使用在触发元素和展示内容元素是分开的场景。通常我们使用 `#reference` 来放置我们的触发元素， 用 `triggering-element` API，您可以任意设置您的触发元素 但注意到触发元素应该是接受 `mouse` 和 `keyboard` 事件的元素。

:::warning

`v-popover` 将被废弃，请使用 `virtual-ref` 作为替代。

:::

:::demo

popover/virtual-triggering

:::

## 内容可扩展

可以在 Popover 中嵌套其它组件， 以下为嵌套表格的例子。

:::demo 利用插槽取代 `content` 属性

popover/nested-information

:::

## 嵌套操作

当然，你还可以嵌套操作， 它比使用dialog更加轻量

:::demo

popover/nested-operation

:::

## 指令

您可以指令性方式弹出窗口，但不再推荐 **** ，因为这使您的应用程序 变得复杂， 您可以参考上述虚拟触发来实现一样的效果。

:::demo

popover/directive-usage

:::

## Popover 属性

| 属性                        | 说明                                                                                                                                                                       | 类型              | 可选值                                                                                                       | 默认值                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| trigger                   | 触发方式                                                                                                                                                                     | string          | click/focus/hover/contextmenu                                                                             | click                                                   |
| title                     | 标题                                                                                                                                                                       | string          | —                                                                                                         | —                                                       |
| effect                    | Tooltip theme, built-in theme: `dark` / `light`                                                                                                                          | string          | string                                                                                                    | dark                                                    |
| content                   | popover content, can be replaced with a default `slot`                                                                                                                   | string          | —                                                                                                         | —                                                       |
| width                     | popover width                                                                                                                                                            | string / number | —                                                                                                         | Min width 150px                                         |
| placement                 | popover placement                                                                                                                                                        | string          | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom                                                  |
| disabled                  | whether Popover is disabled                                                                                                                                              | boolean         | —                                                                                                         | false                                                   |
| visible / v-model:visible | whether popover is visible                                                                                                                                               | Boolean         | —                                                                                                         | false                                                   |
| offset                    | popover offset                                                                                                                                                           | number          | —                                                                                                         | 0                                                       |
| transition                | popover transition animation                                                                                                                                             | string          | —                                                                                                         | el-fade-in-linear                                       |
| show-arrow                | whether a tooltip arrow is displayed or not. For more info, please refer to [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper) | boolean         | —                                                                                                         | true                                                    |
| popper-options            | parameters for [popper.js](https://popper.js.org/docs/v2/)                                                                                                               | object          | please refer to [popper.js](https://popper.js.org/docs/v2/)                                               | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| popper-class              | custom class name for popover                                                                                                                                            | string          | —                                                                                                         | —                                                       |
| show-after                | delay of appearance, in millisecond                                                                                                                                      | number          | —                                                                                                         | 0                                                       |
| hide-after                | delay of disappear, in millisecond                                                                                                                                       | number          | —                                                                                                         | 200                                                     |
| auto-close                | timeout in milliseconds to hide tooltip                                                                                                                                  | number          | —                                                                                                         | 0                                                       |
| tabindex                  | [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Popover                                                                      | number          | —                                                                                                         | —                                                       |
| teleported                | whether popover dropdown is teleported to the body                                                                                                                       | boolean         | true / false                                                                                              | true                                                    |
| persistent                | when popover inactive and `persistent` is `false` , popover will be destroyed                                                                                            | boolean         | —                                                                                                         | true                                                    |

## Popover 插槽

| 插槽名       | 说明                     |
| --------- | ---------------------- |
| —         | Popover 内嵌 HTML 文本     |
| reference | 触发 Popover 显示的 HTML 元素 |

## Popover 事件

| 事件名          | 说明                                            | 回调参数 |
| ------------ | --------------------------------------------- | ---- |
| show         | 显示时触发                                         | —    |
| before-enter | triggers when the entering transition befores | —    |
| after-enter  | triggers when the entering transition ends    | —    |
| hide         | triggers when popover hides                   | —    |
| before-leave | triggers when the leaving transition befores  | —    |
| after-leave  | triggers when the leaving transition ends     | —    |
