---
title: MultipleForm
lang: zh-CN
---

# MultipleForm

用于在一个表单中添加多条数据

### 一个使用的例子

::: demo
multiple-form/basic
:::

### MultipleForm 列校验

```ts
type MultipleFormRules = {
  /** 是否必填 */
  required: boolean | [boolean, string]

  /** 长度 */
  length: number | [number, string]

  /** 最小值  */
  min: number | [number, string]

  /** 最大值  */
  max: number | [number, string]

  /** 正则表达式 */
  match: RegExp | [RegExp, string]

  /** 自定义验证 */
  validator: (
    value: any,
    model: Record<string, any>,
    list: Record<string, any>[]
  ) => Promise<string> | string
}
```

### MultipleForm 列配置

```ts
type MultipleFormColumn = {
  /** 列的名称, 在表头中显示 */
  name: string

  /** 从值中取的字段 */
  key: string

  /** 校验规则 */
  rules?: Partial<MultipleFormRules>

  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'

  /** 列的宽度 */
  width?: number

  /** 默认值, 可以传入一个函数或者异步函数来取里面的值 */
  defaultValue: any | (() => any | Promise<any>)

  /** 自定义渲染*/
  render?: (val: any, row: any, index: number) => string
}
```

### MultipleForm 属性

```ts
type multipleFormProps = {
  /** 列表数据 */
  data: {
    type: Array as PropType<any[]>,
    required: true
  },

  /** 是否显示新增按钮  默认false*/
  createBtnText: {
    type: [String, Boolean] as PropType<string | false>,
    default: '新增'
  },

  /** 列配置  */
  columns: {
    type: Array as PropType<MultipleFormColumn[]>,
    required: true
  },

  /** 设置表单固定高度 */
  height: {
    type: String as PropType<string>
  },

  /** 模式 */
  mode: {
    type: String as PropType<'inline' | 'dialog' | 'custom'>,
    default: 'inline'
  },

  /** 标题 */
  title: {
    type: String
  },

  /** 不可编辑状态, 为true则不会显示操作栏 */
  disabled: {
    type: Boolean
  },

  /** 新增按钮 */
  actionCreate: {
    type: Boolean,
    default: true
  },
  /** 删除按钮 */
  actionDelete: {
    type: Boolean,
    default: true
  },
  /** 编辑按钮 */
  actionEdit: {
    type: Boolean,
    default: true
  }

  /** 操作栏宽度 */
  actionWidth: {
    type: Number,
    default: 120
  }
}
```

### MultipleForm 事件

```ts
| 事件名称          | 说明                         | 回调参数                                                   |
| --------------- | ---------------------------- | ---------------------------------------------------------- |
| save            | 保存                         | Function(value:any) |
| delete          | 删除                         | Function(value:any) |
| add-next-line   | 添加至下一行                   | Function(value:any) |
```
