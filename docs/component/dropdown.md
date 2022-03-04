---
title: Dropdown 下拉菜单
lang: zh-CN
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

:::demo 通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

dropdown/basic-usage

:::

## 触发对象

可使用按钮触发下拉菜单。

:::demo 设置 `split-button` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 `true` 即可。 如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 `divider` 的 CSS class。

dropdown/triggering-element

:::

## 触发方式

可以配置点击激活或者悬停激活。

:::demo 将 `trigger` 属性设置为 click 即可， 默认为 `hover`。

dropdown/how-to-trigger

:::

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

:::demo 下拉菜单默认在点击菜单项后会被隐藏，将 hide-on-click 属性设置为 false 可以关闭此功能。

dropdown/menu-hiding-behavior

:::

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

:::demo

dropdown/command-event

:::

## 下拉方法

您可以手动使用 `手动打开` 或 `手动关闭下拉菜单以打开或关闭`

:::demo

dropdown/dropdown-methods

:::

## 尺寸

Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

:::demo 使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

dropdown/sizes

:::

## Dropdown 属性

| 属性             | 说明                                                                                                    | 类型              | 可选值                                                         | 默认值                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------- | ------------------------------------------------------- |
| type           | 菜单按钮类型，同 `Button` 组件一样，仅在 `split-button` 为 true 的情况下有效。                                               | string          | —                                                           | —                                                       |
| size           | 菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效。                                                              | string          | large / default / small                                     | default                                                 |
| max-height     | 菜单最大高度                                                                                                | string / number | —                                                           | —                                                       |
| split-button   | 下拉触发元素呈现为按钮组                                                                                          | boolean         | —                                                           | false                                                   |
| disabled       | 是否禁用                                                                                                  | boolean         | —                                                           | false                                                   |
| placement      | 菜单弹出位置                                                                                                | string          | top/top-start/top-end/bottom/bottom-start/bottom-end        | bottom                                                  |
| trigger        | 触发下拉的行为                                                                                               | string          | hover/click/contextmenu                                     | hover                                                   |
| hide-on-click  | 是否在点击菜单项后隐藏菜单                                                                                         | boolean         | —                                                           | true                                                    |
| show-timeout   | 展开下拉菜单的延时，仅在 trigger 为 hover 时有效                                                                      | number          | —                                                           | 250                                                     |
| hide-timeout   | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）                                                                     | number          | —                                                           | 150                                                     |
| tabindex       | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number          | —                                                           | 0                                                       |
| popper-class   | 自定义浮层类名                                                                                               | string          | —                                                           | —                                                       |
| popper-options | [popper.js](https://popper.js.org/documentation.html) 参数                                              | Object          | 参考 [popper.js](https://popper.js.org/documentation.html) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |

## Dropdown 插槽

| 插槽名      | 说明                                                                                          | 子标签           |
| -------- | ------------------------------------------------------------------------------------------- | ------------- |
| —        | 下拉菜单的内容 注意：必须是有效的 html 保险套元素（例如 `<span>, <button> 等`）或 `el-component`, 以附加触发监听器 | —             |
| dropdown | 下拉列表，通常是 `<el-dropdown-menu>` 组件                                                      | Dropdown-Menu |

## Dropdown 事件

| 方法名            | 说明                                | 参数                   |
| -------------- | --------------------------------- | -------------------- |
| click          | `split-button` 为 true 时，点击左侧按钮的回调 | —                    |
| command        | 点击菜单项触发的事件回调                      | dropdown-item 的指令    |
| visible-change | 下拉框出现/隐藏时触发                       | 出现则为 true，隐藏则为 false |

## Dropdown 方法

| 方法名         | 说明     | 参数 |
| ----------- | ------ | -- |
| handleOpen  | 打开下拉菜单 | —  |
| handleClose | 关闭下拉菜单 | —  |

## Dropdown-Menu 插槽

| 插槽名 | 说明      | 子标签           |
| --- | ------- | ------------- |
| —   | 下拉菜单的内容 | Dropdown-Item |

## Dropdown-Item 属性

| 属性       | 说明                    | 类型                   | 可选值 | 默认值   |
| -------- | --------------------- | -------------------- | --- | ----- |
| command  | 派发到`command`回调函数的指令参数 | string/number/object | —   | —     |
| disabled | 是否禁用                  | boolean              | —   | false |
| divided  | 是否显示分隔符               | boolean              | —   | false |
| icon     | custom icon           | string / Component   | —   | —     |

## Dropdown-Item 插槽

| 插槽名 | 说明                 |
| --- | ------------------ |
| —   | 自定义Dropdown-Item内容 |
