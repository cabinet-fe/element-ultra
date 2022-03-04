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

在某些用例中，单个选择器可以最终加载数万行的数据。渲染到DOM中的许多数据可能是浏览器的负担，这可能导致性能问题。为了更好的用户和开发者体验，因此开发出一个虚拟化的选择器。

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

## 禁用选择器本身或选项

你可以选择禁用 Select 或者 Select 的 某个选项

:::demo

select/disabled

:::

## 给选项进行分组

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

## SelectV2 属性

| 属性                                | 说明                                                                                                                                       | 类型                                 | 可选值                 | 默认值           |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------- | ------------- |
| model-value / v-model             | 绑定值                                                                                                                                      | string / number / boolean / object | —                   | —             |
| multiple                          | 是否多选                                                                                                                                     | boolean                            | —                   | false         |
| disabled                          | 是否禁用                                                                                                                                     | boolean                            | —                   | false         |
| value-key                         | 作为 value 唯一标识的键名，绑定值为对象类型时必填                                                                                                             | string                             | —                   | value         |
| size                              | 输入框尺寸                                                                                                                                    | string                             | large/default/small | default       |
| clearable                         | 是否可以清空选项                                                                                                                                 | boolean                            | —                   | false         |
| clear-icon                        | 自定义清除图标                                                                                                                                  | string / component                 | —                   | CircleClose   |
| collapse-tags                     | 多选时是否将选中值按文字的形式展示                                                                                                                        | boolean                            | —                   | false         |
| multiple-limit                    | 多选时用户最多可以选择的项目数， 为 0 则不限制                                                                                                                | number                             | —                   | 0             |
| name                              | 选择器的输入框的原生 name 属性                                                                                                                       | string                             | —                   | —             |
| effect                            | Tooltip theme, built-in theme: `dark` / `light`                                                                                          | string                             | string              | light         |
| autocomplete                      | autocomplete of select input                                                                                                             | string                             | —                   | off           |
| placeholder                       | the autocomplete attribute of select input                                                                                               | string                             | —                   | Please select |
| filterable                        | is filterable                                                                                                                            | boolean                            | —                   | false         |
| allow-create                      | whether creating new items is allowed. To use this, `filterable` must be true                                                            | boolean                            | —                   | false         |
| reserve-keyword                   | whether reserve the keyword after select filtered option.                                                                                | boolean                            | —                   | true          |
| no-data-text                      | displayed text when there is no options, you can also use slot empty                                                                     | string                             | —                   | No Data       |
| popper-class                      | custom class name for Select's dropdown                                                                                                  | string                             | —                   | —             |
| popper-append-to-body(deprecated) | whether to append the popper menu to body. If the positioning of the popper is wrong, you can try to set this prop to false              | boolean                            | -                   | false         |
| teleported                        | whether select dropdown is teleported to the body                                                                                        | boolean                            | true / false        | true          |
| popper-options                    | Customized popper option see more at [popper.js](https://popper.js.org/documentation.html)                                               | object                             | -                   | -             |
| automatic-dropdown                | for non-filterable Select, this prop decides if the option menu pops up when the input is focused                                        | boolean                            | -                   | false         |
| clear-icon                        | Customized clear icon component                                                                                                          | string / Component                 | —                   | CircleClose   |
| height                            | The height of the dropdown panel, 34px for each item                                                                                     | number                             | -                   | 170           |
| scrollbar-always-on               | Controls whether the scrollbar is always displayed                                                                                       | boolean                            | -                   | false         |
| remote                            | whether search data from server                                                                                                          | boolean                            | —                   | false         |
| remote-method                     | function that gets called when the input value changes. Its parameter is the current input value. To use this, `filterable` must be true | function(keyword: string)          | —                   | —             |

<span style="display: none;">
<!-- | default-first-option | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 或 `remote` 使用 | boolean | - | false |
| filter-method | 自定义搜索方法 | function | — | — |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| loading-text | 远程加载时显示的文字 | string | — | 加载中 | -->
</span>

## SelectV2 事件

| 事件名            | 说明                   | 回调参数                     |
| -------------- | -------------------- | ------------------------ |
| change         | 选中值发生变化时触发           | val，目前的选中值               |
| visible-change | 下拉框出现/隐藏时触发          | val，出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除tag时触发        | val，移除的tag值              |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                        |
| blur           | 当选择器的输入框失去焦点时触发      | (event: FocusEvent)      |
| focus          | 当选择器的输入框获得焦点时触发      | (event: FocusEvent)      |

## SelectV2 插槽

| 插槽名     | 说明            |
| ------- | ------------- |
| default | 自定义 Option 模板 |
| empty   | 自定义当选项为空时的内容  |
| prefix  | 输入框的前缀        |
