<template>
  <div ref="scrollbar$" :class="ns.b()">
    <div
      ref="wrap$"
      :class="[
        wrapClass,
        ns.e('wrap'),
        { [ns.em('wrap', 'hidden-default')]: !native }
      ]"
      :style="style"
      @scroll.passive="handleScroll"
    >
      <component
        :is="tag"
        ref="resize$"
        :class="[ns.e('view'), viewClass]"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <template v-if="!native">
      <Bar ref="barRef" :always="always" />
    </template>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  shallowRef,
  watch
} from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { addUnit, debugWarn, isNumber, isObject } from '@element-ultra/utils'
import { scrollbarContextKey } from '@element-ultra/tokens'
import { useNamespace } from '@element-ultra/hooks'
import { GAP } from './util'
import Bar from './bar.vue'
import { scrollbarEmits, scrollbarProps } from './scrollbar'
import type { BarInstance } from './bar'
import type { CSSProperties, StyleValue } from 'vue'

defineOptions({
  name: 'ElScrollbar'
})

const props = defineProps(scrollbarProps)
const emit = defineEmits(scrollbarEmits)

const ns = useNamespace('scrollbar')

let stopResizeObserver: (() => void) | undefined = undefined
let stopResizeListener: (() => void) | undefined = undefined

const scrollbar$ = shallowRef<HTMLDivElement>()
const wrap$ = shallowRef<HTMLDivElement>()
const resize$ = shallowRef<HTMLElement>()

const barRef = shallowRef<BarInstance>()

const SCOPE = 'ElScrollbar'

/** 容器高度 */
const wrapHeight = shallowRef(0)
/** 容器宽度 */
const wrapWidth = shallowRef(0)

const { stop } = useResizeObserver(wrap$, ([entry]) => {
  emit('resize', entry.target)
  wrapHeight.value = wrap$.value!.offsetHeight
  wrapWidth.value = wrap$.value!.offsetWidth
})
onUnmounted(() => {
  stop()
})

const style = computed<StyleValue>(() => {
  const style: CSSProperties = {}
  if (props.height) style.height = addUnit(props.height)
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
  return [props.wrapStyle, style]
})

let _scrollTop = 0,
  _scrollLeft = 0

const updateScrollState = (
  scrollTop: number,
  scrollLeft: number
) => {
  _scrollTop = scrollTop
  _scrollLeft = scrollLeft
}

const handleScroll = (event: UIEvent) => {
  const { scrollTop, scrollLeft, scrollHeight, scrollWidth } =
    event.target as HTMLElement
  updateScrollState(scrollTop, scrollLeft)
  update()
  emit('scroll', { scrollTop, scrollLeft, scrollHeight, scrollWidth })
}

// TODO: refactor method overrides, due to script setup dts
// @ts-nocheck
function scrollTo(xCord: number, yCord?: number): void
function scrollTo(options: ScrollToOptions): void
function scrollTo(arg1: unknown, arg2?: number) {
  if (isObject(arg1)) {
    wrap$.value!.scrollTo(arg1)
  } else if (isNumber(arg1) && isNumber(arg2)) {
    wrap$.value!.scrollTo(arg1, arg2)
  }
}

const setScrollTop = (value: number) => {
  if (!isNumber(value)) {
    debugWarn(SCOPE, 'value must be a number')
    return
  }
  wrap$.value!.scrollTop = value
}

const setScrollLeft = (value: number) => {
  if (!isNumber(value)) {
    debugWarn(SCOPE, 'value must be a number')
    return
  }
  wrap$.value!.scrollLeft = value
}

const update = () => {
  const offsetHeight = wrapHeight.value - GAP // wrap$.value.offsetHeight - GAP
  const offsetWidth = wrapWidth.value - GAP // wrap$.value.offsetWidth - GAP

  const originalHeight = offsetHeight ** 2 / wrap$.value!.scrollHeight
  const originalWidth = offsetWidth ** 2 /  wrap$.value!.scrollWidth
  const height = Math.max(originalHeight, props.minSize)
  const width = Math.max(originalWidth, props.minSize)

  const ratioY =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height))

  const ratioX =
    originalWidth /
    (offsetWidth - originalWidth) /
    (width / (offsetWidth - width))

  const moveY = ((_scrollTop * 100) / offsetHeight) * ratioY
  const moveX = ((_scrollLeft * 100) / offsetWidth) * ratioX

  barRef.value?.updateStyle({
    moveX,
    moveY,
    width: width + GAP < offsetWidth ? `${width}px` : '',
    height: height + GAP < offsetHeight ? `${height}px` : '',
    ratioX,
    ratioY
  })
}

watch(
  () => props.noresize,
  noresize => {
    if (noresize) {
      stopResizeObserver?.()
      stopResizeListener?.()
    } else {
      ;({ stop: stopResizeObserver } = useResizeObserver(resize$, ([entry]) => {


        update()
      }))
      stopResizeListener = useEventListener('resize', update)
    }
  },
  { immediate: true }
)

watch(
  [
    () => props.maxHeight,
    () => props.height,
    () => wrapHeight.value,
    () => wrapWidth.value
  ],

  () => {
    if (!props.native)
      nextTick(() => {
        update()
      })
  }
)

provide(scrollbarContextKey, {
  scrollbarElement: scrollbar$,
  wrapElement: wrap$
})

onMounted(() => {
  if (!props.native) nextTick(() => update())
})

defineExpose({
  /** @description scrollbar wrap ref */
  wrap$,
  /** @description scrollbar wrap resize$ */
  resize$,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll
})
</script>
