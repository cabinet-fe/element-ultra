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
/** 弹框选择器的列配置和pro-table的列配置一致详情请查看pro-table文档 */
interface TableSelectColumn extends ProTableColumn {}
```

```ts
type TableSelectProps = {
  /** 选择的值 */
  modelValue?: Record<string, any> | Record<string, any>[];
  /** 列, 属性可以查看pro-table的属性 */
  columns: TableSelectColumn[];
  /** 弹框中可选择的数据 */
  data?: Record<string, any>[];
  /** 是否多选 默认false */
  multiple?: boolean;
  /** 弹框中可选择的数据的请求接口, 可以在全局配置中设置请求方法 */
  api?: string;
  /** 应用分页, 默认false */
  pagination?: boolean;
  /** 显示序号, 默认false */
  showIndex?: boolean;
  /** 查询对象, 从外部传进来 */
  query?: Record<string, any>;
  /** 值的key, 可用于回显时对对象的标记, 默认id */
  valueKey?: string;
  /** 弹框标题 */
  dialogTitle?: string;
  /** 弹框高度 */
  theight?: number;
  /** 是否可编辑, 默认true */
  editable?: boolean;
  /** 是否显示展示的表格, 默认true */
  table: boolean;
  /** 弹框宽度 */
  dialogWidth?: string | number;
  /** 过滤列, (仅过滤弹框中的列) */
  columnFilter?: (column: TableSelectColumn) => boolean
}
```

## 插槽

| 插槽名     | 说明                 |
| ------- | ------------------ |
| seacher | query搜索内容|
| action  | 操作              |
