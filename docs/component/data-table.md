---
title: DataTable 数据表格
lang: zh-CN
---

# DataTable 数据表格

转为渲染数据和数据排版而生的表格, 能够支持大量的数据, 并且带来更加多的交互,
支持列宽的拖拽

## 一个使用的例子

:::demo
data-table/basic
:::

## DataTable 属性
```ts
/** 数据表格属性 */
export const dataTableProps = {
  /** 列配置 */
  columns: {
    type: Array as PropType<DataTableColumn[]>,
    required: true
  },

  /** 指定表格为树形结构 */
  tree: {
    type: [Boolean, String] as PropType<boolean | string>
  },

  /** 表格数据 */
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },

  /** 列最小宽度 */
  columnMinWidth: {
    type: Number,
    default: 100
  },

  /** 尺寸 */
  size: {
    type: String as PropType<ComponentSize>
  },

  /** 是否多选 */
  checkable: {
    type: [Function, Boolean] as PropType<
      boolean | ((row: any, index: number) => boolean)
    >,
    default: false
  },

  /** 多选数据 */
  checked: {
    type: Array as PropType<any[]>
  },

  /** 是否可以单选 */
  selectable: {
    type: [Function, Boolean] as PropType<
      boolean | ((row: any, index: number) => boolean)
    >,
    default: false
  },

  /** 单选数据 */
  selected: {
    type: Object
  },

  /** 显示序号, 可以指定continuos来表示连续的字段, 这样就算跨页也能持续 */
  showIndex: {
    type: Boolean,
    default: false
  },

  /** 在浏览器滚动期间等待cpu闲置 */
  idle: {
    type: Boolean
  },

  /** 显示表尾合计行 */
  showSummary: Boolean,

  /** 合计方式 */
  summaryMethod: {
    type: Function as PropType<
      (ctx: { columns: DataTableColumn[]; data: any[] }) => any[]
    >
  },

  /** 指定合计的列 */
  summaryKeys: Array as PropType<string[]>,

  /** 表格高度 */
  height: {
    type: String
  }
} as const
```

## 数据表格列属性
```ts
/** 数据表格列 */
export type DataTableColumn = {
  /** 是否固定 */
  fixed?: 'left' | 'right'
  align?: 'left' | 'center' | 'right'
  /** 列的默认宽度, 指定fixed属性时, 必须指定 */
  width?: number
  /** 列的最小宽度 */
  minWidth?: number
  /** 列的名称, 在表头中显示 */
  name: string | (() => any)
  /** 从值中取的字段, 支持链式 */
  key: string
  /** 是否支持排序 */
  sortable?: boolean
  /** 自定义渲染 */
  render?: (ctx: {
    /** 单元格的值, 由column.key决定 */
    val: any
    /** 行数据 */
    row: any
    /** 行索引 */
    index: number
    /** 行包装器 */
    wrap: any
  }) => any
  /** 子列 */
  children?: DataTableColumn[]
  /** 插槽名称, 开启将会有个名称为[column.slot]的具名插槽 */
  slot?: string
}
```

## 插槽

| 插槽名     | 说明                 |
| ------- | ------------------ |
|  [column.slot] | "{ row, index }" |


## 事件

```ts
export const dataTableEmits = {
  /** 多选事件 */
  check: (checked: any[]) => true,
  /** 单选事件 */
  select: (selection: any) => true,
  /** 排序改变 */
  sort: (sortKeys: Record<string, 'asc' | 'dsc' | 'default'>) => true
}
```


