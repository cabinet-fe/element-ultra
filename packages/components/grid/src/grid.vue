<template>
  <component ref="gridRef" :is="props.tag" :class="[ns.b(), $attrs.class]" :style="style">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, shallowRef, watch } from 'vue'
import { gridProps, type ResponsiveCols } from './grid'
import type { CSSProperties } from 'vue'
import { useConfig, useNamespace } from '@element-ultra/hooks'
import { throttle } from 'lodash'
import { gridInjectionKey } from './token'

defineOptions({
  name: 'ElGrid'
})

const ns = useNamespace('grid')

const props = defineProps(gridProps)

const emit = defineEmits<{
  (e: 'resize', rect: DOMRectReadOnly): void
}>()

let containerWidth = shallowRef(0)

// 响应式列数
let responsiveCols = shallowRef<number>(1)

const isResponsiveCols = (v: any): v is ResponsiveCols => {
  return Object.prototype.toString.call(v) === '[object Object]'
}

const point = computed(() => {
  return getCurrentPoint(containerWidth.value)
})

provide(gridInjectionKey, {
  point
})

const gridTemplateColumns = computed(() => {
  const { cols } = props

  if (isResponsiveCols(cols)) {
    responsiveCols.value = getPointCols(point.value, cols)
    return `repeat(${responsiveCols.value}, 1fr)`
  }

  if (typeof cols === 'number') {
    return `repeat(${cols}, 1fr)`
  }
  if (typeof cols === 'string') {
    return cols
  }
  return cols.join(' ')
})

const style = computed(() => {
  const { rows } = props

  const gridTemplateRows = typeof rows === 'string' ? rows : rows?.join(' ')
  const result: CSSProperties = {
    gridTemplateColumns: gridTemplateColumns.value,
    gridTemplateRows,
    gap: props.gap
      .split(',')
      .map(s => `${s}px`)
      .join(' ')
  }
  return result
})

const gridRef = shallowRef<HTMLElement>()

const [config] = useConfig()

/**
 * 获取容器断点
 * @param w 容器宽度
 */
const getCurrentPoint = (w: number) => {
  const { xs, s, m, l, xl } = config.breakpoint
  if (w < xs) return 'xs'
  if (w < s) return 's'
  if (w < m) return 'm'
  if (w < l) return 'l'
  if (w < xl) return 'xl'
  return 'xxl'
}

/**
 * 获取断点对应的列
 * @param point 当前所属的断点
 * @param cols
 */
const getPointCols = (point: ReturnType<typeof getCurrentPoint>, cols: ResponsiveCols) => {
  let queue = ['xs', 's', 'm', 'l', 'xl', 'xxl']

  let ret = cols[point]
  let pointIndex = queue.indexOf(point)
  while (ret === undefined && pointIndex <= 5) {
    pointIndex++
    ret = cols[queue[pointIndex]]
  }
  if (ret === undefined) {
    ret = cols.cols
  }

  return ret
}

onMounted(() => {
  const { cols } = props

  if (!gridRef.value || !isResponsiveCols(cols)) return

  const observer = new ResizeObserver(
    throttle((entries: ResizeObserverEntry[]) => {
      const [entry] = entries
      if (!entry) return
      const { width } = entry.contentRect
      containerWidth.value = width
      emit('resize', entry.contentRect)
    }, 500)
  )

  observer.observe(gridRef.value)

  onUnmounted(() => {
    observer.disconnect()
  })
})
</script>
