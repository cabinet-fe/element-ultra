<template>
  <div :class="ns.b()">
    <!-- 滚动容器 start -->
    <div
      ref="wrapRef"
      :class="scrollbarWrapClass"
      :style="scrollbarWrapStyle"
      @scroll.passive="handleScroll"
    >
      <!-- 视图容器 start -->
      <component :style="viewStyle" :class="viewClass" :is="tag" ref="viewRef">
        <slot />
      </component>
      <!-- 视图容器 end -->
    </div>
    <!-- 滚动容器 end -->

    <!-- 滚动条 -->
    <Bars ref="barsRef" @scroll-to="scrollTo" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { useResizeObserver } from '@vueuse/core'
import {
  computed,
  CSSProperties,
  onMounted,
  onUnmounted,
  shallowRef
} from 'vue'
import { scrollbarProps, scrollbarEmits } from './scrollbar'
import useScroll from './use-scroll'
import Bars from './bars.vue'

const props = defineProps(scrollbarProps)

const emit = defineEmits(scrollbarEmits)

const ns = useNamespace('scrollbar')

const barsRef = shallowRef<InstanceType<typeof Bars>>()
const wrapRef = shallowRef<HTMLElement>()
const viewRef = shallowRef<HTMLElement>()

const scrollbarWrapClass = computed(() => {
  return [ns.e('wrap'), props.wrapClass]
})

const scrollbarWrapStyle = computed(() => {
  const style: CSSProperties = {}
  if (props.maxHeight) {
    style.maxHeight = props.maxHeight
  } else {
    style.height = '100%'
  }

  Object.assign(style, props.wrapStyle)

  return style
})

const scrollTo = (ctx: { left?: number; top?: number }) => {
  wrapRef.value?.scrollTo(ctx)
}

const updateBar = useScroll({
  wrapper: wrapRef
})

const handleScroll = () => {
  updateBar(state => {
    emit('scroll', state.wrapState)
    barsRef.value?.update(state)
  })
}

// 需要监听滚动容器和视图容器的size变化重新更新滚动条样式
const contentResizeObserver = useResizeObserver(wrapRef, handleScroll)
const resizeObserver = useResizeObserver(viewRef, handleScroll)

onMounted(() => {
  handleScroll()
})

onUnmounted(() => {
  contentResizeObserver.stop()
  resizeObserver.stop()
})

defineExpose({
  scrollTo,
  wrapRef,
  viewRef
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
