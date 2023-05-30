<template>
  <!-- 水平滚动条 -->
  <transition name="el-fade-in">
    <div
      v-show="(visible.barX && hovered) || moving.x"
      :class="[ns.e('thumb'), ns.em('thumb', 'x'), ns.is('moving', moving.x)]"
      ref="barXRef"
      :style="{ zIndex }"
    ></div>
  </transition>

  <!-- 垂直滚动条 -->
  <transition name="el-fade-in">
    <div
      v-show="(visible.barY && hovered) || moving.y"
      :class="[ns.e('thumb'), ns.em('thumb', 'y'), ns.is('moving', moving.y)]"
      ref="barYRef"
      :style="{ zIndex }"
    ></div>
  </transition>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowReactive,
  shallowRef,
  watch
} from 'vue'

import type { BarState, BarX, BarY } from './scrollbar'

defineProps({
  zIndex: {
    type: Number
  }
})

const emit = defineEmits({
  'scroll-to': (ctx: { left?: number; top?: number }) => true
})

const ns = useNamespace('scrollbar')

const visible = shallowReactive({
  barX: false,
  barY: false
})

const hovered = shallowRef(false)

const barX = shallowReactive<BarX>({
  width: 0,
  left: 0
})

const barY = shallowReactive<BarY>({
  height: 0,
  top: 0
})

// 频繁的事件操作应避免频繁渲染dom, 应该直接操作dom
const barXRef = shallowRef<HTMLDivElement>()
const barYRef = shallowRef<HTMLDivElement>()

const updateX = (s: typeof barX) => {
  const style = barXRef.value?.style
  if (!style) return false
  style.width = `${s.width}px`
  style.transform = `translateX(${s.left}px)`
  return true
}

const updateY = (s: typeof barY) => {
  const style = barYRef.value?.style
  if (!style) return false
  style.height = `${s.height}px`
  style.transform = `translateY(${s.top}px)`
  return true
}

watch(barX, s => {
  if (!updateX(s)) {
    nextTick(() => updateX(s))
  }
})

watch(barY, s => {
  if (!updateY(s)) {
    nextTick(() => updateY(s))
  }
})

/** 容器状态 */
const wrapStyle: BarState['wrapState'] = {
  offsetWidth: 0,
  offsetHeight: 0,
  scrollHeight: 0,
  scrollWidth: 0,
  scrollLeft: 0,
  scrollTop: 0
}

function update(state: BarState) {
  Object.assign(barX, state.barX)
  Object.assign(barY, state.barY)
  Object.assign(visible, state.visible)
  Object.assign(wrapStyle, state.wrapState)
}

let moving = shallowReactive({
  x: false,
  y: false
})

const setMoving = (type: 'x' | 'y', state: boolean) => {
  moving[type] = state
}

const draggable = (
  dom: HTMLDivElement,
  direction: 'x' | 'y',
  cb: (dis: number) => void
) => {
  // 鼠标初始距离, 用于计算拖拽的偏移量
  let originMousePosition = 0
  // 滚动条的初始位置
  let originBarPosition = 0
  // 当前拖拽的偏移量
  let dis = 0

  let mouseAttr = direction
  let onselectstart = document.onselectstart

  const handleMousedown = (e: MouseEvent) => {
    e.stopPropagation()
    // 鼠标左键按下有效
    if (e.button !== 0) return

    setMoving(direction, true)

    window.getSelection()?.removeAllRanges()
    // 如果绑定了其他的mouseDown事件, 应该阻止掉
    e.stopImmediatePropagation()

    originMousePosition = e[mouseAttr]

    originBarPosition = direction === 'x' ? barX.left : barY.top

    // 禁止浏览器的选中事件, 直到mouseup事件触发时还原
    document.onselectstart = () => false
    document.addEventListener('mousemove', handleMousemove)
    document.addEventListener('mouseup', handleMouseup)
  }

  const handleMousemove = (e: MouseEvent) => {
    dis = e[mouseAttr] - originMousePosition

    cb(originBarPosition + dis)
  }

  const handleMouseup = (e: MouseEvent) => {
    setMoving(direction, false)

    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mouseup', handleMouseup)

    document.onselectstart = onselectstart
  }

  dom.addEventListener('mousedown', handleMousedown)

  onBeforeUnmount(() => {
    dom.removeEventListener('mousedown', handleMousedown)
  })
}

onMounted(() => {
  barYRef.value &&
    draggable(barYRef.value, 'y', dis => {
      barY.top =
        dis < 0
          ? 0
          : dis + barY.height > wrapStyle.offsetHeight
          ? wrapStyle.offsetHeight - barY.height
          : dis

      emit('scroll-to', {
        top:
          (barY.top / (wrapStyle.offsetHeight - barY.height)) *
          (wrapStyle.scrollHeight - wrapStyle.offsetHeight)
      })
    })
  barXRef.value &&
    draggable(barXRef.value, 'x', dis => {
      barX.left =
        dis < 0
          ? 0
          : dis + barX.width > wrapStyle.offsetWidth
          ? wrapStyle.offsetWidth - barX.width
          : dis

      emit('scroll-to', {
        left:
          (barX.left / (wrapStyle.offsetWidth - barX.width)) *
          (wrapStyle.scrollWidth - wrapStyle.offsetWidth)
      })
    })
})

defineExpose({
  update,

  setHovered(v: boolean) {
    hovered.value = v
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
