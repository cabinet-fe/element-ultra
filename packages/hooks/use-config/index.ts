//  使用全局的配置
import { reactive, readonly } from 'vue'

interface RequestOptions {
  api: string
  query: Record<string, any>
}

type  RequestResponse = { data: any[]; total?: number }

export type ProTableRequestMethod =  (
  option: RequestOptions
) => Promise<RequestResponse> | RequestResponse

export interface ConfigStore {
  size?: 'large' | 'default' | 'small'
  proTableRequestMethod?: ProTableRequestMethod
  proTableDefaultSize?: number
}

const configStore = reactive<ConfigStore>({
  size: 'default',
  proTableDefaultSize: 20,
})

export const setConfigStore = (config: ConfigStore) => {
  Object.assign(configStore, config)
}

export const useConfig = () => {
  return readonly(configStore)
}
