---
title: Action 操作按钮
lang: zh-CN
---

# Action 操作按钮

操作组是一组操作按钮， 当操作按钮过多并且给予的空间较少可以使用该组件。
一旦组件超过最大的数量剩下就会作为下拉框操作。

## 使用的例子

:::demo 一般在表格的操作列中可以使用

action/basic

:::

## Action 属性

```ts
interface ActionProps {
  /** 是否需要确认 */
  readonly needConfirm: boolean
  /** 尺寸大小 */
  readonly size: 'default' | 'small' | 'large'
}
```


## ActionGroup 属性

```ts
interface ActionGroupProps {
  readonly size: 'default' | 'small' | 'large'
  readonly max: number
}
```

## Action 事件

```ts
type Emits = {
  /** 点击后执行 */
  (e: 'run'): void
}

```