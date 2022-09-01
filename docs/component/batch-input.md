---
title: BatchInput 批量输入
lang: zh-CN
---

# BatchInput 批量输入

批量输入用来表示一组输入, 可以任意添加输入的数量, 也可以对输入的数量进行控制.

## 使用的例子

:::demo 在表单中可以带校验

batch-input/basic

:::

## BatchInput 属性

```ts
interface BatchInputProps {
  placeholder: string;
  /** 最大输入数量 */
  max?: number ;
  size?: "default" | "small" | "large" ;
  disabled?: boolean ;
  /** 初始绑定的值 */
  modelValue?: any[] ;
  label?: string ;
  field?: string ;
  tips?: string ;
  span?: number | 'max';
}
```

## BatchInput 插槽

|     名称    |   作用域参数  |    备注    |
|   :---:    |  :---: |   :---:   |
| default | { item } |  -   |