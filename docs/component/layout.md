---
title: Layout 布局
lang: zh-CN
---

# Layout 布局

~~通过基础的 24 分栏，迅速简便地创建布局。~~


:::warning
当使用旧的el-row和el-col组件来布局时：

组件默认使用 Flex 布局，不需要手动设置 `type="flex"`。

请注意父容器避免使用 `inline` 相关样式，会导致组件宽度不能撑满。
:::


## Grid 网格布局

::: tip
用它就完事了,没事别用el-row,el-col, 除非要兼容老浏览器, 不会还有人想着兼容ie吧？

如果有希望你赶紧离职脱离苦海找到下一家不需要兼容ie的公司。:smile:
:::



网格布局通过给父容器指定列的配置来产生布局效果。该组件使用[grid网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)。

一个简单的示例来了解grid布局如下：
```css
.container {
    // 使用grid布局
    display: grid;
    // 配置列每个列宽信息以空格隔开
    // 下面表示2列等宽（宽度为容器的1/2也就是50%）
    grid-template-columns: 1fr 1fr;
    // 下面列表示3列等宽(宽度为容器的1/3也就是33.333333%)
    grid-template-columns: repeat(3, 1fr);
    // 下面几种都表示2列，第一列200px, 第二列占满
    grid-template-columns: 200px 1fr;

}
```

基于 display: grid 的布局
:::demo grid容器的直接子元素会作为grid布局的items

layout/grid

:::


快速两栏布局
:::demo
layout/grid-two-cols

:::





## Grid 响应式
待后期完善（2022/3/30）
## 基础布局

使用列创建基础网格布局。

:::demo 通过 `row` 和 `col` 组件，并通过 col 组件的 `span` 属性我们就可以自由地组合布局。

layout/basic-layout

:::

## 分栏间隔

支持列间距。

:::demo 行提供 `gutter` 属性来指定列之间的间距，其默认值为 0。

layout/column-spacing

:::

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

:::demo

layout/hybrid-layout

:::

## 列偏移

您可以指定列偏移量。

:::demo 通过制定 col 组件的 `offset` 属性可以指定分栏偏移的栏数。

layout/column-offset

:::

## 对齐方式

默认使用 flex 布局来对分栏进行灵活的对齐。

:::demo 可通过 `justify` 属性来指定 start, center, end, space-between, space-around 其中的值来定义子元素的排版方式。

layout/alignment

:::

## 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

:::demo

layout/responsive-layout

:::

## 基于断点的隐藏类

Element Ultra 额外提供了一系列类名，用于在某些条件下隐藏元素。 这些类名可以添加在任何 DOM 元素或自定义组件上。 如果需要，请自行引入以下文件：

```js
import 'element-ultra/theme-chalk/display.css'
```

:::demo

layout/hidden-class

:::

## Row 属性

| 属性    | 说明                      | 类型   | 可选值                                      | 默认值 |
| ------- | ------------------------- | ------ | ------------------------------------------- | ------ |
| gutter  | 栅格间隔                  | number | —                                           | 0      |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start  |
| align   | flex 布局下的垂直排列方式 | string | top/middle/bottom                           | top    |
| tag     | 自定义元素标签            | string | \*                                          | div    |

## Row 插槽

| 插槽名 | 说明           | 子标签 |
| ------ | -------------- | ------ |
| —      | 自定义默认内容 | Col    |

## Col 属性

| 属性   | 说明                                   | 类型                                        | 可选值 | 默认值 |
| ------ | -------------------------------------- | ------------------------------------------- | ------ | ------ |
| span   | 栅格占据的列数                         | number                                      | —      | 24     |
| offset | 栅格左侧的间隔格数                     | number                                      | —      | 0      |
| push   | 栅格向右移动格数                       | number                                      | —      | 0      |
| pull   | 栅格向左移动格数                       | number                                      | —      | 0      |
| xs     | `<768px` 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| sm     | `≥768px` 响应式栅格数或者栅格属性对象  | number/object (例如 {span: 4, offset: 4})   | —      | —      |
| md     | `≥992px` 响应式栅格数或者栅格属性对象  | number/object (例如 {span: 4, offset: 4})   | —      | —      |
| lg     | `≥1200px` 响应式栅格数或者栅格属性对象 | number/object (例如 {span: 4, offset: 4})   | —      | —      |
| xl     | `≥1920px` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | —      | —      |
| tag    | 自定义元素标签                         | string                                      | \*     | div    |

## Col 插槽

| 插槽名 | 说明           |
| ------ | -------------- |
| —      | 自定义默认内容 |
