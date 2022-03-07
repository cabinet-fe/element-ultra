---
title: DatePicker 日期选择器
lang: zh-CN
---


# DatePicker 日期选择器

用于选择或输入日期

## 选择某一天

以”日“为基本单位，基础的日期选择控件

:::demo 基本单位由 `type` 属性指定。 通过 `shortcuts` 配置快捷选项， 禁用日期通过 `disabledDate` 设置，传入函数

date-picker/enter-date

:::

## 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期

:::demo

date-picker/other-measurements

:::

## 选择一段时间

可在一个选择器中便捷地选择一个时间范围

:::demo 在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 `unlink-panels` 属性解除联动。

date-picker/date-range

:::

## 选择月份范围

可在一个选择器中便捷地选择一个月份范围

:::demo 在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 `unlink-panels` 属性解除联动。

date-picker/month-range

:::

## 默认值

日期选择器会在用户未选择任何日期的时候默认展示当天的日期。 你也可以使用 `default-value` 来修改这个默认的日期。 请注意该值需要是一个可以解析的 `new Date()` 对象。

如果类型是 `daterange`, `default-value` 则会设置左边窗口的默认值。

:::demo

date-picker/default-value

:::

## 日期格式

使用`format`指定输入框的格式。 使用 `value-format` 指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。

在 [这里](https://day.js.org/docs/zh-CN/display/format) 查看 Day.js 支持的 format 参数。

:::warning

请一定要注意传入参数的大小写是否正确

:::

:::demo

date-picker/date-formats

:::

## 默认显示日期

在选择日期范围时，你可以指定起始日期和结束日期的默认时间。

:::demo 默认情况下，开始日期和结束日期的时间部分都是选择日期当日的 `00:00:00`。 通过 `default-time` 可以分别指定开始日期和结束日期的具体时刻。 它接受最多两个日期对象的数组。 其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。

date-picker/default-time

:::

## 设置自定义前缀的内容

前缀内容可以被自定义。

:::demo 当你从其他vue组件或由渲染函数生成的组件中导入组件时, 你可以设置 `prefix-icon` 属性来定制前缀内容

date-picker/custom-prefix-icon

:::

## 自定义内容

弹出框的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据

:::demo

date-picker/custom-content

:::

更详细的数据类型，请查看下表

```ts
interface DateCell {
  column: number
  customClass: string
  disabled: boolean
  end: boolean
  inRange: boolean
  row: number
  selected: Dayjs
  isCurrent: boolean
  isSelected: boolean
  start: boolean
  text: number
  timestamp: number
  date: Date
  dayjs: Dayjs
  type: 'normal' | 'today' | 'week' | 'next-month' | 'prev-month'
}
```

## 国际化

由于 Element Ultra 的默认语言为英语，如果你需要设置其它的语言，请参考[国际化](/guide/i18n)文档。

要注意的是：日期相关的文字（月份，每一周的第一天等等）也都是通过国际化来配置的。

## 属性

| 属性                    | 说明                                                     | 类型                                               | 可选值                                                                            | 默认值         |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------------------------------------------ | ----------- |
| model-value / v-model | 选中项绑定值                                                 | date(DatePicker) / array(DateRangePicker)        | —                                                                              | —           |
| readonly              | 只读                                                     | boolean                                          | —                                                                              | false       |
| disabled              | 禁用                                                     | boolean                                          | —                                                                              | false       |
| size                  | 输入框尺寸                                                  | string                                           | large/default/small                                                            | default     |
| editable              | 文本框可输入                                                 | boolean                                          | —                                                                              | true        |
| clearable             | 是否显示清除按钮                                               | boolean                                          | —                                                                              | true        |
| placeholder           | 非范围选择时的占位内容                                            | string                                           | —                                                                              | —           |
| start-placeholder     | 范围选择时开始日期的占位内容                                         | string                                           | —                                                                              | —           |
| end-placeholder       | 范围选择时结束日期的占位内容                                         | string                                           | —                                                                              | —           |
| type                  | 显示类型                                                   | string                                           | year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange       | date        |
| format                | 显示在输入框中的格式                                             | string                                           | 请查看 [date formats](/component/date-picker#date-formats)                  | YYYY-MM-DD  |
| popper-class          | DatePicker 下拉框的类名                                      | string                                           | —                                                                              | —           |
| range-separator       | 选择范围时的分隔符                                              | string                                           | —                                                                              | '-'         |
| default-value         | 可选，选择器打开时默认显示的时间                                       | Date                                             | anything accepted by `new Date()`                                              | —           |
| default-time          | 范围选择时选中日期所使用的当日内具体时刻                                   | Date[]                                           | 长度为2的数组，每一项都是Date对象。 第一项是起始日期，第二项是终止日期                                         | —           |
| value-format          | 可选，绑定值的格式。 不指定则绑定值为 Date 对象                            | string                                           | 请查阅 [date formats](/component/date-picker#date-formats)                  | —           |
| id                    | 等价于原生 `id` 属性                                          | string / array(string)                           | 字符串 `id="my-date"` 对应单个日期或数组 `:id="['my-range-start', 'my-range-end']"` 对应日期范围 | -           |
| name                  | 等价于原生 `name` 属性                                        | string                                           | —                                                                              | —           |
| unlink-panels         | 在范围选择器里取消两个日期面板之间的联动                                   | boolean                                          | —                                                                              | false       |
| prefix-icon           | 自定义前缀图标                                                | string / Component                               | —                                                                              | Date        |
| clear-icon            | 自定义清除图标                                                | string / Component                               | —                                                                              | CircleClose |
| validate-event        | 输入时是否触发表单的校验                                           | boolean                                          | -                                                                              | true        |
| disabled-date         | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。  | function                                         | —                                                                              | —           |
| shortcuts             | 设置快捷选项，需要传入数组对象                                        | object[{ text: string, value: date / function }] | —                                                                              | —           |
| cell-class-name       | set custom className                                   | Function(Date)                                   | —                                                                              | —           |
| teleported            | whether date-picker dropdown is teleported to the body | boolean                                          | true / false                                                                   | true        |

## 事件

| 事件名             | 说明                                                         | 回调参数                                      |
| --------------- | ---------------------------------------------------------- | ----------------------------------------- |
| change          | 用户确认选定的值时触发                                                | 组件绑定值                                     |
| blur            | 在组件 Input 失去焦点时触发                                          | 组件实例                                      |
| focus           | 在组件 Input 获得焦点时触发                                          | 组件实例                                      |
| calendar-change | 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 `default-value` 来设置成其他的日期。   | [Date, Date]                              |
| panel-change    | 当日期面板改变时触发。                                                | `(date, mode, view)`                      |
| visible-change  | triggers when the DatePicker's dropdown appears/disappears | true when it appears, and false otherwise |

## 方法

| 方法名   | 说明           | 参数              |
| ----- | ------------ | --------------- |
| focus | 使 input 获取焦点 | focusStartInput |

## 插槽

| 插槽名             | 说明         |
| --------------- | ---------- |
| default         | 自定义内容      |
| range-separator | 自定义范围分割符内容 |
