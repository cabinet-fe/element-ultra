<template>
  <div class="sb-wrap">
    <!-- 滚动容器 -->
    <div
      class="sb-content"
      ref="contentRef"
      @scroll.passive="update"
      :style="{
        maxHeight,
        height: maxHeight ? undefined : '100%'
      }"
    >
      <component :is="tag" ref="resizeRef">
        <slot />
      </component>
    </div>

    <!-- 滚动条 -->
    <Bars ref="barsRef" @scroll-to="scrollTo" />
  </div>
</template>

<script lang="ts" setup>
import { useResizeObserver } from '@vueuse/core'
import { onMounted, onUnmounted, shallowRef } from 'vue'
import Bars from './bars.vue'

defineProps({
  tag: {
    type: String,
    default: 'div'
  },

  maxHeight: {
    type: String
  }
})

const barsRef = shallowRef<InstanceType<typeof Bars>>()
const contentRef = shallowRef<HTMLElement>()
const resizeRef = shallowRef<HTMLElement>()

const scrollTo = (ctx: { left?: number; top?: number }) => {
  contentRef.value?.scrollTo(ctx)
}

const update = () => {
  let dom = contentRef.value
  if (!dom) return

  const {
    offsetWidth,
    scrollWidth,
    offsetHeight,
    scrollHeight,
    scrollLeft,
    scrollTop
  } = dom

  let barYHeight = 0
  let barYTop = 0

  let barXWidth = 0
  let barXLeft = 0

  let visibleX = offsetWidth !== scrollWidth
  let visibleY = offsetHeight !== scrollHeight

  if (visibleX) {
    barXWidth = offsetWidth ** 2 / scrollWidth
    barXLeft = (barXWidth * scrollLeft) / offsetWidth
  }

  if (visibleY) {
    barYHeight = offsetHeight ** 2 / scrollHeight
    barYTop = (barYHeight * scrollTop) / offsetHeight
  }

  // 样式
  barsRef.value?.update({
    // 水平bar
    width: barXWidth,
    left: barXLeft,
    containerWidth: offsetWidth,

    // 垂直bar
    height: barYHeight,
    top: barYTop,
    containerHeight: offsetHeight
  })

  // 显隐
  barsRef.value?.updateVisible({
    barX: visibleX,
    barY: visibleY
  })
}

// 需要监听滚动容器和视图容器的size变化重新更新滚动条样式
const contentResizeObserver = useResizeObserver(contentRef, update)
const resizeObserver = useResizeObserver(resizeRef, update)

onMounted(() => {
  update()
})

onUnmounted(() => {
  contentResizeObserver.stop()
  resizeObserver.stop()
})
</script>

<style>
.sb-content {
  overflow: auto;
}

.sb-content::-webkit-scrollbar {
  display: none;
}

.sb-wrap {
  position: relative;
  overflow: auto;
}

.sb-bar {
  position: absolute;
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 3px;
  will-change: transform;
  cursor: pointer;
}

.sb-bar:hover {
  background-color: #ccc;
}


.sb-bar-y {
  right: 0;
  top: 0;
  width: 6px;
}

.sb-bar-x {
  bottom: 0;
  left: 0;
  height: 6px;
}
</style>
