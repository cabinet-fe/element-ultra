<template>
  <ElScrollbar
    ref="containerRef"
    @scroll="handleScroll"
    :style="{ height }"
    :view-style="listStyle"
  >
    <component :is="tag" v-bind="$attrs" ref="wrapRef">
      <slot name="prepend" />
      <slot :list="renderedRange" :style="itemStyle" />
      <slot name="append" />
    </component>
  </ElScrollbar>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
  type PropType
} from 'vue'
import ElScrollbar from '@element-ultra/components/scrollbar'
import { useResizeObserver } from '@vueuse/core'
import { debounce } from 'lodash'

const props = defineProps({
  /** 指定渲染的元素标签 */
  tag: {
    type: String,
    default: 'div'
  },

  /** 容器高度 */
  height: {
    type: String
  },

  /** 所有数据 */
  data: {
    type: Array as PropType<any[]>,
    default: () => []
  },

  /** 唯一标识key */
  uniqueKey: {
    type: String
  },

  /** 预渲染数量 */
  prerender: {
    type: Number,
    default: 60
  },

  /** 缓冲区高度, 优化滚动性能 */
  bufferHeight: {
    type: Number,
    default: 200
  },

  /** 尺寸大小 */
  itemSize: {
    type: Number,
    default: 40
  },

  /** 优化滚动性能减少 */
  idle: {
    type: Boolean
  }
})

type ScrollCtx = {
  scrollTop: number
  scrollLeft: number
  scrollHeight: number
  scrollWidth: number
}

const itemStyle = computed(() => {
  return {
    height: props.itemSize + 'px'
  }
})

const wrapRef = shallowRef<HTMLElement>()

const emit = defineEmits({
  scroll: (s: ScrollCtx) => true
})

/** 总高度, 预估高度 */
let totalHeight = computed(() => {
  return props.itemSize * props.data.length
})

const listStyle = computed(() => {
  return {
    height: totalHeight.value + 'px',
    display: 'inline-block'
  }
})

/** 当前滚动的位置 */
let position = shallowRef(0)

/** 容器高度 */
let containerHeight = 0

/** 列表渲染范围 */
const renderedRange = computed(() => {
  const { itemSize, bufferHeight, data } = props

  /** 使用缓冲区对冲掉网上滚动时元素的渲染 */
  let end = position.value + ~~((containerHeight + bufferHeight * 2) / itemSize)

  return data.slice(position.value, end)
})

watch(() => props.data, () => {
  position.value = 0
  containerRef.value?.scrollTo({ top: 0})
})

watch(
  [() => position.value, () => props.itemSize],
  ([position, itemSize]) => {
    if (!wrapRef.value) return

    wrapRef.value.style.transform = `translateY(${position * itemSize}px)`
  },
  { immediate: true }
)

let scroll = debounce((s: ScrollCtx) => {
  position.value = ~~((s.scrollTop - props.bufferHeight) / props.itemSize)
  position.value < 0 && (position.value = 0)
}, 16.67)

/** 正常滚动 */
const handleScroll = (s: ScrollCtx) => {
  emit('scroll', s)
  scroll(s)
  // requestAnimationFrame(() => {
  //   emit('scroll', s)
  //   scroll(s)
  // })
}
const containerRef = shallowRef<InstanceType<typeof ElScrollbar>>()

watch(
  () => props.itemSize,
  () => {
    if (!containerRef.value?.wrapRef) return
    const { scrollHeight, scrollTop, scrollLeft, scrollWidth } =
      containerRef.value?.wrapRef
    scrollTop &&
      handleScroll({
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth
      })
  }
)

let stop: () => void
onMounted(() => {
  stop = useResizeObserver(containerRef.value?.wrapRef, ([entry]) => {
    const { height } = entry.contentRect
    containerHeight = height
  }).stop
})

onUnmounted(() => {
  stop?.()
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
