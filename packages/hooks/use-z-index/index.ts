import { ref, computed } from 'vue'
import { useConfig } from '../use-config'

const zIndex = ref(0)

export const useZIndex = () => {
  const [store] = useConfig()
  const initialZIndex = store.zIndex
  const currentZIndex = computed(() => initialZIndex + zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}
