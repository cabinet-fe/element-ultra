<template>
  <!-- 水平滚动条 -->
  <div v-show="visibleX" class="sb-bar sb-bar-x" ref="barXRef"></div>

  <!-- 垂直滚动条 -->
  <div v-show="visibleY" class="sb-bar sb-bar-y" ref="barYRef"></div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, reactive, shallowRef, watch } from 'vue'

const visibleX = shallowRef(false)
const visibleY = shallowRef(false)

const barX = reactive({
  width: 0,
  left: 0
})

const barY = reactive({
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

type Styles = {
  width: number
  height: number
  left: number
  top: number
}

function update(style: Styles) {
  barX.width = style.width
  barX.left = style.left
  barY.height = style.height
  barY.top = style.top
}

type Visible = {
  barX: boolean
  barY: boolean
}

function updateVisible(v: Visible) {
  visibleX.value = v.barX
  visibleY.value = v.barY
}

const draggable = (dom: HTMLDivElement) => {
  let originX = 0
  let originY = 0

  let disX = 0
  let disY = 0

  const handleMousemove = (e: MouseEvent) => {
    disX = e.x - originX
    disY = e.y - originY
    console.log(disY, disX)
  }

  const handleMouseup = (e: MouseEvent) => {
    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mouseup', handleMouseup)
  }

  const handleMousedown = (e: MouseEvent) => {
    originX = e.x
    originY = e.y

    e.stopPropagation()

    document.addEventListener('mousemove', handleMousemove)
    document.addEventListener('mouseup', handleMouseup)
  }

  dom.addEventListener('mousedown', handleMousedown)

  onBeforeUnmount(() => {
    dom.removeEventListener('mousedown', handleMousedown)
  })
}

onMounted(() => {
  barYRef.value && draggable(barYRef.value)
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
