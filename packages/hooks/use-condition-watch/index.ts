import { shallowRef, watch, type WatchCallback, type WatchOptions } from 'vue'

export const useConditionWatch = (source: any, callback: WatchCallback, options?: WatchOptions) => {
  const condition = shallowRef(false)
  watch(source, (...args) => {
    if (!condition.value) return
    callback(...args)
  }, options)
  return condition
}