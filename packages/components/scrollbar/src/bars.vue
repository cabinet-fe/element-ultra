<template>
  <!-- 水平滚动条 -->
  <div v-show="visibleX" class="sb-bar sb-bar-x" ref="barXRef"></div>

  <!-- 垂直滚动条 -->
  <div v-show="visibleY" class="sb-bar sb-bar-y" ref="barYRef"></div>
</template>

<script lang="ts" setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  shallowRef,
  watch
} from 'vue'

const emit = defineEmits({
  'scroll-to': (ctx: { left?: number, top?: number }) => true
})

const visibleX = shallowRef(false)
const visibleY = shallowRef(false)

const barX = reactive({
  width: 0,
  left: 0,
  containerWidth: 0
})

const barY = reactive({
  height: 0,
  top: 0,
  containerHeight: 0
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

type Styles = {
  width: number
  height: number
  left: number
  top: number
  containerWidth: number
  containerHeight: number
}

function update(style: Styles) {
  barX.width = style.width
  barX.left = style.left
  barX.containerWidth = style.containerWidth
  barY.height = style.height
  barY.top = style.top
  barY.containerHeight = style.containerHeight
}

type Visible = {
  barX: boolean
  barY: boolean
}

function updateVisible(v: Visible) {
  visibleX.value = v.barX
  visibleY.value = v.barY
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
          : dis + barY.height > barY.containerHeight
          ? barY.containerHeight - barY.height
          : dis

      emit('scroll-to', {
        top: barY.top * barY.containerHeight / barY.height
      })
    })
  barXRef.value &&
    draggable(barXRef.value, 'x', dis => {
      barX.left =
        dis < 0
          ? 0
          : dis + barX.left > barX.containerWidth
          ? barX.containerWidth
          : dis

      emit('scroll-to', {
        left: barX.left * barX.containerWidth / barX.width
      })
    })
})

defineExpose({
  update,
  updateVisible
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
