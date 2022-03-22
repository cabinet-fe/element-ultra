---
title: Form 表单
lang: zh-CN
---

# Form 表单

表单是web应用的核心之一.

element-ultra的表单在原来element-plus的基础上做了大量的改动.

1. 你无需在你的表单中加入el-form-item元素来包裹表单控件
2. 借助useFormModel方法, 你无需分开定义规则和表单值
3. 内部使用el-grid组件来完成自适应布局
4. 校验方法移到了form中, 这意味着内存的节省
5. 不再依赖async-validator的校验


## 比较完整的表单示例

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。
该示例很完整, 包含label-position控制, size尺寸控制.
:::demo

form/validation

:::


## 数字类型验证

:::demo 数字类型的验证需要在 `v-model` 处加上 `.number` 的修饰符，这是 Vue 自身提供的用于将绑定值转化为数字类型的修饰符。

form/number-validate

:::

:::tip

当一个 `el-form-item` 嵌套在另一个 `el-form-item`时，其标签宽度将是 `0`。 如果需要可以为 `el-form-item` 单独设置 `label-width` 属性。

:::

## Form 属性

| 属性                    | 说明                                                                                        | 类型            | 可选值                | 默认值 |
| ----------------------- | ------------------------------------------------------------------------------------------- | --------------- | --------------------- | ------ |
| data                   | 表单数据对象                                                                                | object          | —                     | —      |
| rules                   | 表单验证规则                                                                                | object          | —                     | —      |
| inline                  | 行内表单模式                                                                                | boolean         | —                     | false  |
| label-position          | 表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 `label-width`                    | string          | left / right / top    | right  |
| label-width             | 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 `auto`。 | string / number | —                     | —      |
| label-suffix            | 表单域标签的后缀                                                                            | string          | —                     | —      |
| hide-required-asterisk  | 是否显示必填字段的标签旁边的红色星号                                                        | boolean         | —                     | false  |
| show-message            | 是否显示校验错误信息                                                                        | boolean         | —                     | true   |
| inline-message          | 是否以行内形式展示校验信息                                                                  | boolean         | —                     | false  |
| status-icon             | 是否在输入框中显示校验结果反馈图标                                                          | boolean         | —                     | false  |
| validate-on-rule-change | 是否在 `rules` 属性改变后立即触发一次验证                                                   | boolean         | —                     | true   |
| size                    | 用于控制该表单内组件的尺寸                                                                  | string          | medium / small / mini | —      |
| disabled                | 是否禁用该表单内的所有组件。 若设置为 true，则表单内组件上的 disabled 属性不再生效          | boolean         | —                     | false  |

## Form 方法

| 方法名        | 说明                                                                                                                                                                                      | 回调参数                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| validate      | 对整个表单作验证。 参数为一个回调函数。 验证表单后，回调函数会包含两个参数：一个布尔值，表示表单验证是否通过；一个对象，包含所有未通过验证的字段。 若不传入回调函数，则会返回一个 promise | Function(callback: Function(boolean, object))                              |
| validateField | 对部分表单字段进行校验的方法                                                                                                                                                              | Function(props: string \| array, callback: Function(errorMessage: string)) |
| resetFields   | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果                                                                                                                                | —                                                                          |
| scrollToField | 滚动到指定表单字段                                                                                                                                                                        | Function(prop: string)                                                     |
| clearValidate | 清理指定字段的表单验证信息。 参数是一个或多个需要清除验证信息的表单属性名。 如果省略了参数，将清除所有字段的验证信息。                                                                    | Function(props: string \| array)                                           |

## Form 事件

| 事件名称 | 说明                   | 回调参数                                                   |
| -------- | ---------------------- | ---------------------------------------------------------- |
| validate | 任一表单项被校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在） |

## Form 插槽

| 插槽名 | 说明                      | 子标签    |
| ------ | ------------------------- | --------- |
| —      | 存放所有的 form-item 内容 | Form-Item |

## FormItem 属性

| 属性           | 说明                                                                                                     | 类型            | 可选值                            | 默认值 |
| -------------- | -------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------- | ------ |
| prop           | 表单域 `model` 字段， 在使用 validate、resetFields 方法的情况下，该属性是必填的                          | string          | 传入 Form 组件的 `model` 中的字段 |        |
| label          | 标签                                                                                                     | string          | —                                 | —      |
| label-width    | 表单域标签的宽度，例如 '50px'。 支持 `auto`。                                                            | string / number | —                                 | —      |
| required       | 是否必填，如不设置，则会根据校验规则自动生成                                                             | boolean         | —                                 | false  |
| rules          | 表单验证规则, 具体配置见下表, 更多内容参考[async-validator](https://github.com/yiminghe/async-validator) | object / array  | —                                 | —      |
| error          | 表单域验证错误信息, 设置该值会使表单验证状态变为 error，并显示该错误信息                                 | string          | —                                 | —      |
| show-message   | 是否显示校验错误信息                                                                                     | boolean         | —                                 | true   |
| inline-message | 以行内形式展示校验信息                                                                                   | boolean         | —                                 | false  |
| size           | 控制组件在此表单项中的大小                                                                               | string          | medium / small / mini             | —      |

## Rules

| 属性    | 说明         | 类型   | 可选值        | 默认值 |
| ------- | ------------ | ------ | ------------- | ------ |
| trigger | 触发校验方式 | string | blur / change | —      |

## Form-Item 插槽

| 插槽名 | 说明                                                  |
| ------ | ----------------------------------------------------- |
| —      | Form Item 的内容                                      |
| label  | 标签上显示的自定义内容。 自定义标签，参数为 { label } |
| error  | 自定义内容以显示验证消息。 参数是 { error }           |

## Form-Item 方法

| 方法名        | 说明                                                 | 参数 |
| ------------- | ---------------------------------------------------- | ---- |
| resetField    | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | —    |
| clearValidate | 移除该字段的验证状态                                 | —    |
