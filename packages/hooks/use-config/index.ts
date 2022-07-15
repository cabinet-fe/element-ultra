//  使用全局的配置
import { shallowReactive, shallowReadonly, type Component } from 'vue'

interface RequestOptions {
  api: string
  query: Record<string, any>
}

export type RequestResponse = { data: any[]; total?: number; raw: any }

export type ProTableRequestMethod = (option: RequestOptions) => Promise<RequestResponse>

export type TableSelectRequestMethod = (option: RequestOptions) => Promise<RequestResponse>

export interface ConfigStore {
  /** 全局组件尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 集成表格的api使用的请求方法 */
  proTableRequestMethod?: ProTableRequestMethod
  /** 集成表格分页默认大小 */
  proTableDefaultSize?: number
  /** 断点 */
  breakpoint: { xs: number; s: number; m: number; l: number; xl: number }
  /** 表格选择器 */
  tableSelectRequestMethod?: TableSelectRequestMethod
  /** 消息弹框 */
  message?: {
    max: number
  }
  /** zIndex */
  zIndex: number
  /** 命名空间 */
  namespace: string
  /** page页面额外组件 */
  pageExtraComponents?: Component[]
}

const configStore = shallowReactive<ConfigStore>({
  size: 'default',
  proTableDefaultSize: 20,
  breakpoint: { xs: 540, s: 768, m: 1280, l: 1536, xl: 1920 },
  zIndex: 2000,
  namespace: 'el'
})

const setConfigStore = (config: Partial<ConfigStore>) => {
  Object.assign(configStore, config)
}

export const useConfig = () => {
  return [shallowReadonly(configStore), setConfigStore] as const
}
