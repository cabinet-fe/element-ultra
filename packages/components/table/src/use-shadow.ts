import { shallowRef } from 'vue'

export default function useShadow() {
  const leftShadow = shallowRef(false)
  const rightShadow = shallowRef(false)

  const handleScroll = (ctx: any) => {
    if (ctx.scrollLeft > 0) {
      leftShadow.value = true
    } else {
      leftShadow.value = false
    }

    let scrollRight = ctx.scrollWidth - ctx.scrollLeft - ctx.offsetWidth

    if (scrollRight > 0) {
      rightShadow.value = true
    } else {
      rightShadow.value = false
    }
  }

  return {
    leftShadow,
    rightShadow,
    handleScroll
  }
}
