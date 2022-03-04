---
title: Rate 评分
lang: zh-CN
---

# Rate 评分

用于评分

## 基础用法

:::demo 评分默认被分为三个等级，可以利用颜色数组对分数及情感倾向进行分级（默认情况下不区分颜色）。 三个等级所对应的颜色用 `colors` 属性设置，而它们对应的两个阈值则通过 `low-threshold` 和 `high-threshold` 设定。

rate/basic-usage

:::

## 尺寸

:::demo

rate/sizes

:::

## 允许半选

:::demo 属性 `allow-half` 允许出现半星

rate/allow-half

:::

## 辅助文字

用辅助文字直接地表达对应分数

:::demo 为组件设置 `show-text` 属性会在右侧显示辅助文字。 通过设置 `texts` 可以为每一个分值指定对应的辅助文字。 `texts` 为一个数组，长度应等于最大值 `max`。

rate/text

:::

## 其它 icon

当有多层评价时，可以用不同类型的 icon 区分评分层级

:::demo 设置`icon-classes`属性可以自定义不同分段的图标。 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名。 本例还使用 `void-icon-class` 指定了未选中时的图标类名。

rate/more-icons

:::

## 只读

只读的评分用来展示分数， 允许出现半星

:::demo 为组件设置 `disabled` 属性表示组件为只读，支持小数分值。 此时若设置 `show-score`，则会在右侧显示目前的分值。 可以提供 `score-template` 作为显示模板，模板为一个包含了 `{value}` 的字符串，`{value}` 会被解析为分值。 模板为一个包含了 `{value}` 的字符串，`{value}` 会被解析为分值。

rate/readonly

:::

## 自定义样式

您可以为rate组件设置自定义样式。 使用 `css/scss` 语言来更改全局或局部颜色。 我们设置了一些全局颜色变量：`--el-rate-void-color`, `--el-rate-star-color`, `--el-rate-disable-void-color`, `--el-rate-text-color`. 您可以像这样使用：`:root { --el-rate-void-color: red; --el-rate-star-color: blue; }`.

### 默认变量

| 变量                           | 颜色      |
| ---------------------------- | ------- |
| --el-rate-void-color         | #c6d1de |
| --el-rate-star-color         | #f7ba2a |
| --el-rate-disable-void-color | #eff2f7 |
| --el-rate-text-color         | #1f2d3d |

## Rate 属性

| 属性                    | 说明                                                                     | 类型               | 可选值                     | 默认值                                                                |
| --------------------- | ---------------------------------------------------------------------- | ---------------- | ----------------------- | ------------------------------------------------------------------ |
| model-value / v-model | 选中项绑定值                                                                 | number           | —                       | 0                                                                  |
| max                   | 最大分值                                                                   | number           | —                       | 5                                                                  |
| size                  | 尺寸                                                                     | string           | large / default / small | default                                                            |
| disabled              | 是否为只读                                                                  | boolean          | —                       | false                                                              |
| allow-half            | 是否允许半选                                                                 | boolean          | —                       | false                                                              |
| low-threshold         | 低分和中等分数的界限值， 值本身被划分在低分中                                                | number           | —                       | 2                                                                  |
| high-threshold        | 高分和中等分数的界限值， 值本身被划分在高分中                                                | number           | —                       | 4                                                                  |
| colors                | icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色 | array/object     | —                       | ['#F7BA2A', '#F7BA2A', '#F7BA2A']                                  |
| void-color            | 未选中 icon 的颜色                                                           | string           | —                       | #C6D1DE                                                            |
| disabled-void-color   | 只读时未选中 icon 的颜色                                                        | string           | —                       | #EFF2F7                                                            |
| icons                 | 图标组件 若传入数组，共有 3 个元素，为 3 个分段所对应的类名；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名      | array/object     | —                       | [StarFilled, StarFilled, StarFilled]                               |
| void-icon             | 未被选中的图标组件                                                              | string/component | —                       | Star                                                               |
| disabled-void-icon    | 禁用状态的未选择图标                                                             | string/component | —                       | StarFilled                                                         |
| show-text             | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容                                | boolean          | —                       | false                                                              |
| show-score            | 是否显示当前分数， 是否显示当前分数， show-score 和 show-text 不能同时为真                      | boolean          | —                       | false                                                              |
| text-color            | 辅助文字的颜色                                                                | string           | —                       | #1F2D3D                                                            |
| texts                 | 辅助文字数组                                                                 | array            | —                       | ['Extremely bad', 'Disappointed', 'Fair', 'Satisfied', 'Surprise'] |
| score-template        | 分数显示模板                                                                 | string           | —                       | {value}                                                            |

## Rate 事件

| 事件名    | 描述说明    | 参数        |
| ------ | ------- | --------- |
| change | 分值改变时触发 | val，改变后的值 |
