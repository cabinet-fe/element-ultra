---
title: TreeSelect 树形选择器
lang: zh-CN
---

# TreeSelect 树形选择器

树形选择器长用于树形数据的多选和单选操作， 比如组织架构，权限等嵌套数据

## 一个使用的例子

:::demo
tree-select/basic
:::

## TreeSelect 属性

```ts
type TreeSelectProps = {
  /** 是否禁止选择 */
  readonly disabled: boolean
  /** 是否开启多选 */
  readonly multiple: boolean
  /** 尺寸大小， 默认default */
  readonly size: 'default' | 'large' | 'small'
  /** 占位符, 默认请输入 */
  readonly placeholder: string
  /**  */
  readonly tagHit: boolean
  /** 值的key, 指定后表示以哪个字段作为值， 默认 value */
  readonly valueKey: string
  /** label文本的key, 指定后表示以哪个字段作为文本展现, 默认label */
  readonly labelKey: string
  /** children的key, 指定后表示以哪个字段作为子节点数据， 默认children */
  readonly childrenKey: string
  /** disabled的key, 指定后表示以哪个字段控制树的可选？， 默认disabled */
  readonly disabledKey: string
  /** 数据 */
  readonly data: any[]
  /** 树严格选中？ */
  readonly checkStrictly: boolean
  /** 树的缩进长度， 默认16 */
  readonly treeIndent: number
  /** 单选高亮， 默认true */
  readonly highlightCurrent: boolean
  /** 值 */
  readonly modelValue?: string | number | (string | number)[] | undefined
  /**  */
  readonly treeIcon?: string | undefined
  /** 数据为空时展现的内容 */
  readonly emptyText?: string | undefined
}
```

## TreeSelect 事件

```ts

```
