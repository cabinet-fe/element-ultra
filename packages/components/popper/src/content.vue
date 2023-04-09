<template>
  <div
    ref="popperContentRef"
    :style="contentStyle"
    :class="contentClass"
    role="tooltip"
    @mouseenter="emit('mouseenter', $event)"
    @mouseleave="emit('mouseleave', $event)"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  inject,
  provide,
  unref,
  onMounted,
  watch,
  onBeforeUnmount
} from 'vue'
import { createPopper } from '@popperjs/core'
import { useZIndex, useNamespace } from '@element-ultra/hooks'
import { POPPER_INJECTION_KEY, POPPER_CONTENT_INJECTION_KEY } from './tokens'
import { usePopperContentProps } from './popper'
import { buildPopperOptions, unwrapMeasurableEl } from './utils'

defineOptions({
  name: 'ElPopperContent'
})

const props = defineProps(usePopperContentProps)

const emit = defineEmits({
  mouseenter: (e: MouseEvent) => true,
  mouseleave: (e: MouseEvent) => true
})

const { triggerRef, popperInstanceRef, contentRef } = inject(
  POPPER_INJECTION_KEY,
  undefined
)!
const { nextZIndex } = useZIndex()
const ns = useNamespace('popper')
const popperContentRef = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)
const arrowOffset = ref<number>()
provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowRef,
  arrowOffset
})
const contentZIndex = ref(props.zIndex || nextZIndex())

const contentStyle = computed(() => {
  return [
    {
      zIndex: unref(contentZIndex)
    },
    props.popperStyle || {}
  ]
})

const contentClass = computed(() => [
  ns.b(),
  ns.is('pure', props.pure),
  ns.is(props.effect),
  props.popperClass
])

const createPopperInstance = ({ referenceEl, popperContentEl, arrowEl }) => {
  const options = buildPopperOptions(props, {
    arrowEl,
    arrowOffset: unref(arrowOffset)
  })

  return createPopper(referenceEl, popperContentEl, options)
}

const updatePopper = () => {
  unref(popperInstanceRef)?.update()
  contentZIndex.value = props.zIndex || nextZIndex()
}

onBeforeUnmount(() => {
  let inst = popperInstanceRef.value

  // TODO这里使用了一个移除操作来防止销毁时导致出现滚动条的bug
  if (inst) {
    let popper: HTMLElement | null = inst.state.elements.popper
    popper.remove()
    popper = null
    inst.destroy()
  }
})

onMounted(() => {
  let updateHandle: ReturnType<typeof watch>

  watch(
    () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef),
    val => {
      updateHandle?.()
      if (val) {
        popperInstanceRef.value?.destroy()
        const popperContentEl = unref(popperContentRef)!
        contentRef.value = popperContentEl
        const arrowEl = unref(arrowRef)

        const newInstance = createPopperInstance({
          referenceEl: val,
          popperContentEl: unref(popperContentRef)!,
          arrowEl
        })
        popperInstanceRef.value = newInstance

        updateHandle = watch(
          () => val!.getBoundingClientRect(),
          () => {
            updatePopper()
          },
          {
            immediate: true
          }
        )
      } else {
        popperInstanceRef.value = null
      }
    },
    {
      immediate: true
    }
  )

  watch(
    () =>
      buildPopperOptions(props, {
        arrowEl: unref(arrowRef),
        arrowOffset: unref(arrowOffset)
      }),
    option => popperInstanceRef.value?.setOptions(option)
  )
})

defineExpose({
  updatePopper
})
</script>
