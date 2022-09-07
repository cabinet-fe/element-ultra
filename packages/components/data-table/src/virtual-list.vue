<template>
  <ElScrollbar ref="containerRef" :height="height" @scroll="handleScroll">
    <div :style="listStyle">
      <component
        :is="tag"
        v-bind="$attrs"
        :style="{
          'will-change': 'transform',
          transform: `translateY(${position * itemSize}px)`
        }"
      >
        <slot
          v-for="(item, index) of renderedRange"
          :key="item[uniqueKey]"
          v-bind="{ item, index }"
          :style="{
            height: itemSize + 'px'
          }"
        />
      </component>
    </div>
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

interface Scroll {
  scrollTop: number
  scrollLeft: number
}
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

  // TODO根据缓冲区高度优化滚动性能
  /** 缓冲区高度, 防止出现闪烁 */
  bufferHeight: {
    type: Number,
    default: 100
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

/** 总高度, 预估高度 */
let totalHeight = computed(() => {
  return props.itemSize * props.data.length
})

const listStyle = computed(() => {
  return {
    minHeight: totalHeight.value + 'px'
  }
})

/** 当前滚动的位置 */
let position = shallowRef(0)

let uid = 0
/** 如果没有传入uniqueKey则默认提供一个 */
const computedData = computed(() => {
  return props.uniqueKey
    ? props.data
    : props.data.map(item => {
        return {
          ...item,
          _id: uid++
        }
      })
})

/** 容器高度 */
const containerHeight = shallowRef(0)

/** 列表渲染范围 */
const renderedRange = computed(() => {
  const { itemSize, bufferHeight } = props

  /** 这里的缓冲区要乘以2对冲掉上侧的缓冲 */
  let end =
    position.value + ~~((containerHeight.value + bufferHeight * 2) / itemSize)

  return computedData.value.slice(position.value, end)
})

/** 用来cancelIdleCallback */
let idleId: number
/** 空闲时滚动, 防止cpu阻止渲染 */
const handleScrollWhenIdle = (s: Scroll) => {
  // 计算当前渲染位置
  cancelIdleCallback(idleId)
  idleId = requestIdleCallback(() => {
    position.value = ~~((s.scrollTop - props.bufferHeight) / props.itemSize)
    position.value < 0 && (position.value = 0)
  })
}

/** 正常滚动 */
const handleScrollNormal = (s: Scroll) => {
  requestAnimationFrame(() => {
    position.value = ~~((s.scrollTop - props.bufferHeight) / props.itemSize)
    position.value < 0 && (position.value = 0)
  })
}
const handleScroll = computed(() => {
  return props.idle ? handleScrollWhenIdle : handleScrollNormal
})

const containerRef = shallowRef<InstanceType<typeof ElScrollbar>>()

watch(
  () => props.itemSize,
  size => {
    const scrollTop = containerRef.value?.wrap$?.scrollTop
    scrollTop &&
      handleScroll.value({
        scrollTop,
        scrollLeft: 0
      })
  }
)

/** 唯一标识符的key, 用于优化性能 */
const uniqueKey = computed(() => {
  return props.uniqueKey || '_id'
})

let stop: () => void
onMounted(() => {
  stop = useResizeObserver(containerRef.value?.wrap$, ([entry]) => {
    const { height } = entry.contentRect
    containerHeight.value = height
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
