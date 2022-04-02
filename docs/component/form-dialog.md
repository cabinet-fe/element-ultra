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

## useFormDialog方法
element-ultra提供了一个useFormDialog的hooks, 该函数接收一个响应式的对象, 返回
dialog对象和open方法。

dialog属性：

- visible 控制表单的显示隐藏
- ctx 一个可以传入任意值的上下文
- data 填充到表单的数据，一旦传入该属性， 原始表单数据会被自动合并 
- title 标题
- type 类型默认有'create' 'update'两种

```ts
import { useFormDialog, useFormModel } from 'elelemnt-ultra'

const [data, rules] = useFormModel({
  field1: {},
  field2: {}
})
// or
// const data = reactive({
//   field1: '',
//   field2: ''
// })

// useFormDialog方法默认有'create' | 'update'两种类型， 你也可以传入自定义类型
const [dialog, open] = useFormDialog<'create' | 'update'>(data)


// 分页页面
open('create', {
  title: '弹框标题',
  ctx: {
    parentId: ''
  }
})

// 上面的open调用后
// 弹框会被打开
// 你可以访问dialog对象访问由open传入的数据

```

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
