import { ref } from 'vue'
import { isFunction } from '@vue/shared'

export function useInput(handleInput: (event: InputEvent) => void) {
  const isComposing = ref(false)

  const handleCompositionStart = () => {
    isComposing.value = true
  }

  const handleCompositionUpdate = (event) => {
    const text = event.target.value
    isComposing.value = true
  }

  const handleCompositionEnd = (event) => {
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
    handleCompositionEnd,
  }
}
