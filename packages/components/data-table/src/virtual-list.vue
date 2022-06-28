<template>
  <div :style="{ height, overflow: 'auto' }" @scroll="handleScroll">
    <component :is="tag" :style="{ height: scrollHeight + 'px' }">
      <template v-for="(row, index) of data">
        <slot v-bind="{ row, index }" />
      </template>
    </component>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash'
import { computed, shallowRef, type PropType } from 'vue'

// 动画高效性和渲染高效性缺一不可
// 设置缓冲区, 并且给滚动事件加上防抖(停止滚动后一定的时间再渲染)

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

  /** 单项高度 */
  itemSize: {
    type: Number,
    default: 40
  },

  /** 预渲染数量 */
  prerender: {
    type: Number,
    default: 60
  },

  /** 缓冲区高度 */
  bufferHeight: {
    type: Number,
    default: 100
  }
})

const scrollHeight = computed(() => {
  return props.itemSize * props.data.length
})

/** 开始渲染元素的索引 */
let startIndex = shallowRef(0)

const willRenderItems = computed(() => {
  /** 已渲染的数量 */
  return props.data.slice(startIndex.value).map(item => {
    return {
      ...item,
      _top: 0
    }
  })
})

// 一轮的滚动距离(触发缓冲区之前的)
let scrolledDistance = 0
// 缓冲区距离起始位置
let bufStart = 0
const handleScroll = debounce((ev: UIEvent) => {
  const { scrollTop } = ev.target as HTMLElement

  if (scrolledDistance > props.bufferHeight) {
    bufStart = scrollTop
  } else {
    scrolledDistance
  }

  // 为缓冲区
  startIndex.value =  Math.ceil(scrollTop / props.itemSize)
}, 300)
</script>
