---
title: FormDialog 表单
lang: zh-CN
---

# FormDialog 表单

很多表单是放在弹框里面出现的, 为了方便对弹框的操作，可以使用该组件

:::tip
大部分时候推荐使用 useFormDialog api 来操作你的表单
:::

## 基础示例

:::demo

form-dialog/basic

:::

## FormDialog 属性

```ts
interface FormDialogProps {
  /** 显隐 */
  readonly modelValue: boolean
  /** 是否显示提交并继续按钮 */
  readonly continue: boolean
  /** 标题 */
  readonly title?: string | undefined
  /** 提交 */
  readonly confirm?: FormDialogConfirmFn | undefined
}
```
