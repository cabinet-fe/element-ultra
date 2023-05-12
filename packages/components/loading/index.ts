import { Loading } from './src/service'
import { vLoading } from './src/directive'

export const ElLoading = {
  directive: vLoading,
  service: Loading
}

export default ElLoading

export const ElLoadingDirective = vLoading
export const ElLoadingService = Loading

export * from './src/types'
