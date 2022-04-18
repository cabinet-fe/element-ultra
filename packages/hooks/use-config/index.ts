//  使用全局的配置
import { reactive, readonly } from 'vue'

interface RequestOptions {
  api: string
  query: Record<string, any>
}

type RequestResponse = { data: any[]; total?: number }

export type ProTableRequestMethod = (
  option: RequestOptions
) => Promise<RequestResponse>

export interface ConfigStore {
  /** 全局组件尺寸 */
  size?: 'large' | 'default' | 'small'
  /** 集成表格的api使用的请求方法 */
  proTableRequestMethod?: ProTableRequestMethod
  /** 集成表格分页默认大小 */
  proTableDefaultSize?: number
  /** 断点 */
  breakpoint: { xs: number; s: number; m: number; l: number; xl: number }
}

const configStore = reactive<ConfigStore>({
  size: 'default',
  proTableDefaultSize: 20,
  breakpoint: { xs: 540, s: 768, m: 1280, l: 1536, xl: 1920 }
})

const setConfigStore = (config: Partial<ConfigStore>) => {
  Object.assign(configStore, config)
}

export const useConfig = () => {
  return [readonly(configStore), setConfigStore] as const
}
