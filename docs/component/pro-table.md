---
title: ProTable 专业表格
lang: zh-CN
---

# ProTable 专业表格

专业表格在一般表格的基础上进行了封装

- 提供了 api 属性, 方便直接传 api 进行数据请求
- 提供列的配置

## 一个使用的例子

:::warning
本例子中 table 的 api 属性需要你全局设置 table 的请求方法, 就像以下那样在你的入口文件中指定,
设置一次就不用管了.
:::

```ts
// 你的入口文件 main.ts
import { useConfig } from 'element-ultra'

const request: ProTableRequestMethod = ({ api, query }) => {
  //  在控制台查看参数
  console.log('api: ', api)
  console.log('query', query)

  return new Promise((rs, rj) => {
    setTimeout(() => {
      const data = Array.from({ length: 20 }).map((_, i) => ({
        name: '张' + i,
        age: 10 + i,
      }))
      rs({
        data,
        total: data.length, // 在分页时total必须返回
      })
    }, 600)
  })
}
const [, setConfigStore]  = useConfig()
setConfigStore({
  // 表格分页的默认分页size
  proTableDefaultSize: 60,
  // 请求方法
  proTableRequestMethod: request,
})
```

:::demo
pro-table/basic
:::

## ProTable 属性

```ts
type PropTableProps = {
  /** 列配置 */
  readonly columns: ProTableColumn[];
  /** 展现分页 */
  readonly pagination?: boolean;
  /** 数据请求接口, 如果传了data属性, 该属性将失效 */
  readonly api?: string | undefined;
  /** 数据 */
  readonly data?: any[] | undefined;
  /** 在左侧展现索引 */
  readonly showIndex?: BuildPropType<BooleanConstructor, unknown, unknown> | undefined;
  /** 显示复选框与selectable属性互斥, 只有一个生效 */
  readonly checkable?: BuildPropType<...> | undefined;
  /** 显示单选框与checkable属性互斥, 只有一个生效 */
  readonly selectable?: BuildPropType<...> | undefined;
  /** 检索对象, 传入table来让table自动帮你筛选数据 */
  readonly query?: Record<...> | undefined;
  /** 表格高度, 一旦指定表头就会固定了 */
  readonly height?: BuildPropType<...> | undefined;
}
```

## ProTableColumn 属性

```ts
interface ProTableColumn {
  /** 列的默认宽度 */
  width?: number
  /** 列的名称, 在表头中显示 */
  name: string | (() => VNode)
  /** 从值中取的字段, 支持链式 */
  key: string
  /** 是否支持排序 */
  sort?: boolean
  /** 自定义渲染 */
  render?: (row: any, index: number, val: string) => any
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 是否固定 */
  fixed?: 'left' | 'right'
  /** 子列 */
  children?: ProTableColumn[]
}
```


## ProTable 插槽

| 名称      | 说明                         |
| ------- | -------------------------- |
| row-expand | 展开行内容 |
| [column.slot] | 在列中自定义的插槽名称 |

