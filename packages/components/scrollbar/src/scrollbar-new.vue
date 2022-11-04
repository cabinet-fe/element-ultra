<template>
  <div class="sb-wrap">
    <div class="sb-content" ref="contentRef" @scroll.passive="update">
      <slot />
    </div>

    <Bars ref="barsRef" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef } from 'vue'
import Bars from './bars.vue'

defineProps({

})

const contentRef = shallowRef<HTMLElement>()
const barsRef = shallowRef<InstanceType<typeof Bars>>()

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
    barXLeft = (scrollLeft * barXWidth) / offsetWidth
  }

  if (visibleY) {
    barYHeight = offsetHeight ** 2 / scrollHeight
    barYTop = (scrollTop * barYHeight) / offsetHeight
  }

  // 样式
  barsRef.value?.update({
    // 水平bar
    width: barXWidth,
    left: barXLeft,

    // 垂直bar
    height: barYHeight,
    top: barYTop
  })

  // 显隐
  barsRef.value?.updateVisible({
    barX: visibleX,
    barY: visibleY
  })
}

onMounted(() => {
  update()
})
</script>

<style>
.sb-content {
  height: 100%;
  overflow: auto;
}

.sb-content::-webkit-scrollbar {
  display: none;
}

.sb-wrap {
  height: 100%;
  position: relative;
}

.sb-bar {
  position: absolute;
  background-color: #ccc;
  border-radius: 3px;
  will-change: transform;
  cursor: pointer;
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
