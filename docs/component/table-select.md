---
title: TableSelect 表格选择器
lang: zh-CN
---

# TableSelect 表格选择器

用于在一个表格中选取一条或多条数据在页面的表格中显示的一个组件

## 一个使用的例子

:::demo
table-select/basic
:::

## TableSelect 属性

```ts
type TableSelectProps = {
  /** 值 {id: 1} || [{id: 1}, {id: 2}]*/
  readonly modelValue: Object as PropType<Record<string, any>>,
  /** 表头（参照pro-table） */
  readonly columns: Array as PropType<Record<string, any>[]>,
  /** 表格数据 */
  readonly data: Array as PropType<Record<string, any>[]>,
  /** 是否多选 */
  readonly multiple: type: Boolean,
  /** 分页api */
  readonly api: String,
  /** 分页 */
  readonly pagination: Boolean,
  /** 是否显示序号 */
  readonly showIndex: Boolean,
  /** 表格斑马纹（默认开启） */
  readonly stripe: Boolean,
  /** 索引值，默认为id */
  readonly valueKey: String,
  /** 弹框标题 */
  readonly dialogTitle: String,
  /** 弹框内表格高度（default: 300） */
  readonly theight: Number
  /** 选择按钮显示、隐藏 */
  readonly editable: Boolean
}
```

## 插槽

| 插槽名     | 说明                 |
| ------- | ------------------ |
| seacher | query搜索内容|
| action  | 操作              |
