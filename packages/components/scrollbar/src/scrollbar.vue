<template>
  <div
    :class="ns.b()"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- 滚动容器 start -->
    <div
      ref="wrapRef"
      :class="scrollbarWrapClass"
      :style="scrollbarWrapStyle"
      @scroll.passive="handleScroll"
    >
      <!-- 视图容器 start -->
      <component :style="viewStyle" :class="_viewClass" :is="tag" ref="viewRef">
        <slot />
      </component>
      <!-- 视图容器 end -->
    </div>
    <!-- 滚动容器 end -->

    <!-- 滚动条 -->
    <Bars ref="barsRef" :z-index="zIndex" @scroll-to="scrollTo" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { useResizeObserver } from '@vueuse/core'
import {
  computed,
  CSSProperties,
  onBeforeUnmount,
  onMounted,
  shallowRef
} from 'vue'
import { scrollbarProps, scrollbarEmits } from './scrollbar'
import useScroll from './use-scroll'
import Bars from './bars.vue'

const props = defineProps(scrollbarProps)

const emit = defineEmits(scrollbarEmits)

const ns = useNamespace('scrollbar')

const _viewClass = computed(() => {
  const { viewClass } = props
  let ret: string[] = [ns.e('view')]
  if (Array.isArray(viewClass)) {
    ret = [...ret, ...viewClass]
  } else if (viewClass) {
    ret.push(viewClass)
  }
  return ret
})

const barsRef = shallowRef<InstanceType<typeof Bars>>()
const wrapRef = shallowRef<HTMLElement>()
const viewRef = shallowRef<HTMLElement>()

const scrollbarWrapClass = computed(() => {
  return [ns.e('wrap'), props.wrapClass]
})

const scrollbarWrapStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.maxHeight) {
    style.maxHeight = props.maxHeight
  } else {
    style.height = '100%'
  }

  Object.assign(style, props.wrapStyle)

  return style
})

const scrollTo = (ctx: { left?: number; top?: number }) => {
  wrapRef.value?.scrollTo(ctx)
}

const updateBar = useScroll({
  wrapper: wrapRef
})

const handleScroll = () => {
  updateBar(state => {
    emit('scroll', state.wrapState)
    barsRef.value?.update(state)
  })
}

// 需要监听滚动容器和视图容器的size变化重新更新滚动条样式
// @ts-ignore
const contentResizeObserver = useResizeObserver(wrapRef, ([entry]) => {
  emit('view-resize', entry.contentRect)
  handleScroll()
})
// @ts-ignore
const resizeObserver = useResizeObserver(viewRef, () => {
  handleScroll()
})

const handleMouseEnter = () => {
  barsRef.value?.setHovered(true)
}

const handleMouseLeave = () => {
  barsRef.value?.setHovered(false)
}

onMounted(() => {
  handleScroll()
})

onBeforeUnmount(() => {
  contentResizeObserver.stop()
  resizeObserver.stop()
})

defineExpose({
  scrollTo,
  wrapRef,
  viewRef
})
</script>
