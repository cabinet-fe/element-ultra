<template>
  <ElScrollbar ref="containerRef" :height="height" @scroll="handleScroll">
    <component
      :is="tag"
      :style="listStyle"
      class="list-container"
    >
      <slot
        v-for="(item, index) of renderedRange"
        :key="item[uniqueKey]"
        class="list-item"
        v-bind="{ item, index }"
        :style="{
          transform: `translateY(${(position + index) * itemSize}px)`,
          height: itemSize + 'px'
        }"
      />
    </component>
  </ElScrollbar>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, shallowRef, watch, type PropType } from 'vue'
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
  let end =
    position.value +
    Math.ceil((containerHeight.value + bufferHeight) / itemSize)

  return computedData.value.slice(position.value, end)
})

/** 空闲handle的id, 用来cancelIdleCallback */
let idleId: number
/** 空闲时滚动, 防止cpu阻止渲染 */
const handleScrollWhenIdle = (s: Scroll) => {
  // 计算当前渲染位置
  cancelIdleCallback(idleId)
  idleId = requestIdleCallback(() => {
    position.value = ~~(s.scrollTop / props.itemSize)
  })
}

/** 正常滚动 */
const handleScrollNormal = (s: Scroll) => {
  requestAnimationFrame(() => {
    position.value = ~~(s.scrollTop / props.itemSize)
  })
}
const handleScroll = computed(() => {
  return props.idle ? handleScrollWhenIdle : handleScrollNormal
})

const containerRef = shallowRef<InstanceType<typeof ElScrollbar>>()

watch(() => props.itemSize, (size) => {
  const scrollTop = containerRef.value?.wrap$?.scrollTop
  scrollTop && handleScroll.value({
    scrollTop,
    scrollLeft: 0
  })
})

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

<style lang="scss">
.list-container {
  padding: 0;
  margin: 0;
  position: relative;
}
.list-item {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
