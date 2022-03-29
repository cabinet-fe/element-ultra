---
title: Select 选择器
lang: zh-CN
---

# Select 下拉选择器

:::tip

下拉选择器现在已经使用虚拟列表改造, 这意味着它能够支撑十万级别的数据渲染.
或许可能存在部分缺陷.

:::

## 背景

在某些用例中，单个选择器可以最终加载数万行的数据。渲染到 DOM 中的许多数据可能是浏览器的负担，这可能导致性能问题。为了更好的用户和开发者体验，因此开发出一个虚拟化的选择器。

## 基础用法

适用广泛的基础选择器

:::demo

select/basic-usage

:::

## 多选

最基础的多选选择器

:::demo

select/multiple

:::

## 隐藏多余标签的多选

:::demo

select/hide-extra-tags

:::

## 可过滤的多选

当选项太多时，你可以使用 `filterable` 选项来启用过滤功能来找到所需的选项

:::demo

select/filterable

:::

## ~~禁用选择器本身或选项~~（将会改进 2022/3/29）

你可以选择禁用 Select 或者 Select 的 某个选项

:::demo

select/disabled

:::

## ~~给选项进行分组~~ (将会改进 2022/3/29)

我们可以为选项分组，只需要和下面这个例子一样便可。

:::demo

select/grouping

:::

## 自定义选项的渲染模板

我们也可以通过自己自定义模板来渲染自己想要的选项内容。

:::demo

select/customized-option

:::

## 一键清除

一键删除所有的选项（也可适用于单选）

:::demo

select/clearable

:::

## 创建临时选项

可以创建并选中选项中不存在的条目

使用 `allow-create` 属性，用户可以通过输入框创建新项目。 为了使 `allow-create` 正确的工作， `filterable` 的值必须为 `true`.

:::tip

最好在使用 `allow-create` 属性的同时设置 `:reserve-keyword="false"`

:::

:::demo

select/allow-create

:::

## 远程搜索

输入关键字以从远程服务器中查找数据。

:::demo 从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remote-method`。 `remote-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。

select/remote-search

:::

## Select 属性

| 属性                                           | 说明                                                                                   | 类型                               | 可选值              | 默认值      |
| ---------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------- | ------------------- | ----------- |
| model-value / v-model                          | 绑定值                                                                                 | string / number / boolean / object | —                   | —           |
| multiple                                       | 是否多选                                                                               | boolean                            | —                   | false       |
| disabled                                       | 是否禁用                                                                               | boolean                            | —                   | false       |
| value-key                                      | 作为 value 唯一标识的键名                                                              | string                             | —                   | value       |
| label-key                                      | 作为 label 唯一标识的键名                                                              | string                             | —                   | value       |
| size                                           | 输入框尺寸                                                                             | string                             | large/default/small | default     |
| clearable                                      | 是否可以清空选项                                                                       | boolean                            | —                   | false       |
| clear-icon                                     | 自定义清除图标                                                                         | string / component                 | —                   | CircleClose |
| collapse-tags                                  | 多选时是否将选中值按文字的形式展示                                                     | boolean                            | —                   | false       |
| multiple-limit                                 | 多选时用户最多可以选择的项目数， 为 0 则不限制                                         | number                             | —                   | 0           |
| name                                           | 选择器的输入框的原生 name 属性                                                         | string                             | —                   | —           |
| effect                                         | Tooltip 主题, 内建主题: `dark` / `light`                                               | string                             | string              | light       |
| autocomplete                                   | 选择器的自动完成                                                                       | string                             | —                   | off         |
| placeholder                                    | 占位                                                                                   | string                             | —                   | 请选择      |
| filterable                                     | 开启过滤                                                                               | boolean                            | —                   | false       |
| allow-create                                   | 允许创建选项，使用时保证 filterable=true                                               | boolean                            | —                   | false       |
| reserve-keyword                                | 过滤后的选项是否保留关键字                                                             | boolean                            | —                   | true        |
| no-data-text                                   | 无数据时显示的内容                                                                     | string                             | —                   | No Data     |
| popper-class                                   | popper 的类                                                                            | string                             | —                   | —           |
| popper-append-to-body(废弃了，使用 teleported) | 将 popper 插入到 body 中渲染，如果 popper 的位置异常可以尝试使用                       | boolean                            | -                   | false       |
| teleported                                     | 将 popper 插入到 body 中渲染，如果 popper 的位置异常可以尝试使用                       | boolean                            | true / false        | true        |
| popper-options                                 | 自定义 popper 的属性， 更多请查看[popper.js](https://popper.js.org/documentation.html) | object                             | -                   | -           |
| automatic-dropdown                             | 对于不可过滤的 Select，该属性决定在聚焦输入时是否弹出选项菜单                          | boolean                            | -                   | false       |
| clear-icon                                     | 自定义清除图标                                                                         | string / Component                 | —                   | CircleClose |
| height                                         | 下拉面板的高度, 每项为 34px                                                            | number                             | -                   | 170         |
| scrollbar-always-on                            | 控制滚动条是否一直显示                                                                 | boolean                            | -                   | false       |
| remote                                         | 远程查询数据                                                                           | boolean                            | —                   | false       |
| remote-method                                  | 远程数据查询方法。要使用得确保 filterable=true                                         | function(keyword: string)          | —                   | —           |

<span style="display: none;">
<!-- | default-first-option | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | boolean | - | false |
| filter-method | 自定义搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 | -->
</span>

## Select 事件

| 事件名         | 说明                                     | 回调参数                           |
| -------------- | ---------------------------------------- | ---------------------------------- |
| change         | 选中值发生变化时触发                     | val，目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | val，出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除 tag 时触发                | val，移除的 tag 值                 |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                                  |
| blur           | 当选择器的输入框失去焦点时触发           | (event: FocusEvent)                |
| focus          | 当选择器的输入框获得焦点时触发           | (event: FocusEvent)                |

## Select 插槽

| 插槽名  | 说明                     |
| ------- | ------------------------ |
| default | 自定义 Option 模板       |
| empty   | 自定义当选项为空时的内容 |
| prefix  | 输入框的前缀             |
