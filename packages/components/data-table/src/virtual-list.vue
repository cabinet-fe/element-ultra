<template>
  <ElScrollbar ref="containerRef" :height="height" @resize="handleResize" @scroll="handleScroll">
    <div :style="listStyle">
      <component
        :is="tag"
        v-bind="$attrs"
        ref="wrapRef"
        :style="{
          'will-change': 'transform'
        }"
      >
        <slot name="prepend" />
        <slot
          v-for="item of renderedRange"
          :key="item._id"
          v-bind="{ item: item.data, index: item.index }"
          :style="{
            height: itemSize + 'px'
          }"
        />
        <slot name="append" />
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

const wrapRef = shallowRef<HTMLElement>()

const emit = defineEmits({
  scroll: (s: ScrollCtx) => true,
  resize: (s: Element) => true,
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
  const { uniqueKey } = props
  // 对原始数据进行包裹, 同时不能破坏原有的结构
  return props.data.map(
    uniqueKey
      ? (item, index) => {
          return {
            data: item,
            index,
            _id: item[uniqueKey]
          }
        }
      : (item, index) => {
          return {
            data: item,
            index,
            _id: uid++
          }
        }
  )
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
}, 30)

/** 用来cancelIdleCallback */
let idleId: number
/** 空闲时滚动, 防止cpu阻止渲染 */
const handleScrollWhenIdle = (s: ScrollCtx) => {
  // 计算当前渲染位置
  cancelIdleCallback(idleId)
  idleId = requestIdleCallback(() => {
    emit('scroll', s)
    scroll(s)
  })
}

/** 正常滚动 */
const handleScrollNormal = (s: ScrollCtx) => {
  requestAnimationFrame(() => {
    emit('scroll', s)
    scroll(s)
  })
}
const handleScroll = computed(() => {
  return props.idle ? handleScrollWhenIdle : handleScrollNormal
})

const handleResize = (s: Element) => {
  emit('resize', s)
}

const containerRef = shallowRef<InstanceType<typeof ElScrollbar>>()

watch(
  () => props.itemSize,
  () => {
    if (!containerRef.value?.wrap$) return
    const { scrollHeight, scrollTop, scrollLeft, scrollWidth } = containerRef.value?.wrap$
    scrollTop &&
      handleScroll.value({
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth
      })
  }
)

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
