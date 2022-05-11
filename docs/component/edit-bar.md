---
title: EditBar 编辑栏
lang: zh-CN
---

# EditBar 编辑栏

编辑栏封装了一个列表样式的侧栏, 通常用于两栏布局当中

## 基础演示

下面展示了一个基础编辑栏

:::demo

edit-bar/basic

:::

## 树形编辑栏

下面展示了一个基础编辑栏

:::demo

edit-bar/tree

:::

## 属性

```ts
type EditBarProps = {
  /** 是否可排序， 对tree无效 */
  readonly sortable: boolean
  /** 值的标识 */
  readonly valueKey: string
  /** 标签文本的标识 */
  readonly labelKey: string
  /** 默认数据 */
  readonly data?: any[] | undefined
  /** 是否显示树形数据 */
  readonly tree?: boolean
  /** 子节点字段名称， 默认children, 只在为tree时生效 */
  readonly childrenKey?: string
}
```

## 事件

```ts
interface EditBarEmit {
  /** 新增, 为tree时， item可能会携带数据 */
  (e: 'create', item?: any): void
  /** 更改 */
  (e: 'update', item: any): void
  /** 选择 */
  (e: 'select', id: any, item: any): void
  /** 删除 */
  (e: 'delete', id: any, item: any): void
  /** 排序 */
  (e: 'sorted', list: any[], from: number, to: number): void
}
```
