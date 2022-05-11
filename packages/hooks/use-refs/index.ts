import { onBeforeUpdate, shallowRef } from 'vue'

export const useRefs = <T = any>() => {
  const refs = shallowRef<T[]>([])
  const getRef = (v: T) => {
    refs.value.push(v)
  }

  onBeforeUpdate(() => {
    refs.value = []
  })
  return [refs, getRef] as const
}
