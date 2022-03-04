---
title: Textarea 文本域
lang: zh-CN
---

# Textarea 文本域

用于输入多行文本信息可缩放的输入框。

文本域高度可通过 rows 属性控制

## 基础用法

基础文本域

:::demo

textarea/basic

:::

## 自动高度

:::demo

textarea/auto-rows

:::

## Textarea 属性

| 属性                 | 说明                                                                 | 类型               | 可选值                              | 默认值 |
| -------------------- | -------------------------------------------------------------------- | ------------------ | ----------------------------------- | ------ |
| modelValue / v-model | 绑定值                                                               | string / number    | —                                   | —      |
| maxlength            | 最大输入长度                                                         | string / number    | —                                   | —      |
| minlength            | 原生属性，最小输入长度                                               | number             | —                                   | —      |
| show-word-limit      | 是否显示输入字数统计                                                 | boolean            | —                                   | false  |
| placeholder          | 输入框占位文本                                                       | string             | —                                   | —      |
| disabled             | 是否禁用                                                             | boolean            | —                                   | false  |
| rows                 | 输入框行数                                                           | number             | —                                   | 2      |
| autosize             | 高度是否自适应, 可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }` | boolean / object   | —                                   | false  |
| autocomplete         | 原生属性，自动补全                                                   | string             | —                                   | off    |
| name                 | 原生属性                                                             | string             | —                                   | —      |
| readonly             | 原生属性，是否只读                                                   | boolean            | —                                   | false  |
| max                  | 原生属性，设置最大值                                                 | —                  | —                                   | —      |
| min                  | 原生属性，设置最小值                                                 | —                  | —                                   | —      |
| step                 | 原生属性，设置输入字段的合法数字间隔                                 | —                  | —                                   | —      |
| resize               | 控制是否能被用户缩放                                                 | string             | none / both / horizontal / vertical | —      |
| autofocus            | 原生属性，自动获取焦点                                               | boolean            | —                                   | false  |
| form                 | 原生属性                                                             | string             | —                                   | —      |
| label                | 输入框关联的 label 文字                                              | string             | —                                   | —      |
| tabindex             | 输入框的 tabindex                                                    | string / number    | -                                   | -      |
| inner-style          | textarea 元素的 style                                   | object             | -                                   | {}     |

## Textarea 事件

| 事件名 | 说明                                          | 参数                      |
| ------ | --------------------------------------------- | ------------------------- |
| blur   | 失去焦点时触发                                | (event: Event)            |
| focus  | 获得焦点时触发                                | (event: Event)            |
| change | 在失去焦点或用户按下回车时触发                | (value: string \| number) |
| input  | 在输入值改变时触发                            | (value: string \| number) |
| clear  | 在点击由 `clearable` 属性生成的清空按钮时触发 | —                         |

## Textarea 方法

| 方法   | 说明                   | 参数 |
| ------ | ---------------------- | ---- |
| focus  | 使 Textarea 获取焦点   | —    |
| blur   | 使 Textarea 失去焦点   | —    |
| select | 选中 Textarea 中的文字 | —    |
