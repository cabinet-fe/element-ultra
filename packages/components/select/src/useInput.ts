import { ref } from 'vue'
import { isFunction } from '@vue/shared'

export function useInput(handleInput: (event: Event) => void) {
  const isComposing = ref(false)

  const handleCompositionStart = (event: CompositionEvent) => {
    isComposing.value = true
  }

  const handleCompositionUpdate = (event: CompositionEvent) => {
    isComposing.value = true
  }

  const handleCompositionEnd = (event: CompositionEvent) => {
    if (isComposing.value) {
      isComposing.value = false
      if (isFunction(handleInput)) {
        handleInput(event)
      }
    }
  }

  return {
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd
  }
}
