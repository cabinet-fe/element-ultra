---
title: 全局配置
lang: zh-CN
---


# useConfig 全局配置

useConfig是一个提供了全局配置的组合式方法, 通常建议你在项目的入口文件处将其配置完毕.

底层使用reactive, 易用且易读


## 使用方式

```ts
import { useConfig } from 'element-ultra'
const [, setConfigStore] = useConfig()

setConfigStore({
  size: 'large'
})
```



## 所有配置属性
```ts
interface ConfigStore {
  /** 全局组件尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 集成表格的api使用的请求方法 */
  proTableRequestMethod?: ProTableRequestMethod
  /** 集成表格分页默认大小 */
  proTableDefaultSize?: number
}
```
全局配置后续还会继续更新, 参考此[文件](https://github.com/cabinet-fe/element-pro/blob/main/packages/hooks/use-config/index.ts)来查看最新的配置