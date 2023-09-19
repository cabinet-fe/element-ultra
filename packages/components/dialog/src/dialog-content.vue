<template>
  <div
    :class="[
      ns.b(),
      ns.is('fullscreen', fullscreen),
      ns.is('draggable', draggable),
      { [ns.m('center')]: center },
      ns.is('mousedown', mousedown)
    ]"
    aria-modal="true"
    role="dialog"
    :aria-label="title || 'dialog'"
    :style="style"
    ref="contentRef"
  >
    <div
      ref="headerRef"
      :class="ns.e('header')"
      @mousedown.self="handleMouseDown"
    >
      <ElNodeRender v-if="slots.title" :nodes="slots.title()" />
      <span v-else :class="ns.e('title')">
        {{ title }}
      </span>
      <!-- @ts-ignore -->
      <el-icon @click="$emit('close')" v-if="showClose" :class="ns.e('close')">
        <component :is="closeIcon || Close" />
      </el-icon>
    </div>
    <div @click.stop :class="ns.e('body')" :style="bodyStyle">
      <ElNodeRender :nodes="slots.default?.()" />
    </div>
    <div v-if="slots.footer" :class="ns.e('footer')">
      <section :class="ns.e('footer-left')">
        <ElNodeRender :nodes="slots['footer-left']?.()" />
      </section>
      <section :class="ns.e('footer-right')">
        <ElNodeRender :nodes="slots.footer?.()" />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, shallowRef } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import { ElNodeRender } from '@element-ultra/components/node-render'
import { CloseComponents } from '@element-ultra/utils'
import { dialogContentProps } from './dialog-content'
import { dialogInjectionKey } from './token'

const { Close } = CloseComponents

defineProps(dialogContentProps)

const { headerRef, ns, style, slots, rootProps } = inject(dialogInjectionKey)!

const bodyStyle = computed(() => {
  const { bodyHeight } = rootProps
  if (bodyHeight) {
    return {
      height:
        bodyHeight === 'max'
          ? `calc(80vh - ${slots.footer ? 88 : 44}px)`
          : bodyHeight + 'px'
    }
  }
  return {
    maxHeight: `calc(80vh - ${slots.footer ? 88 : 44}px)`
  }
})

const contentRef = shallowRef<HTMLElement>()

let originX = 0,
  originY = 0

let lastX = 0
let lastY = 0

let translateX = 0,
  translateY = 0

let mousedown = shallowRef(false)

let mouseDownTimer: number | null = null

const handleMouseDown = (e: MouseEvent) => {
  mouseDownTimer = setTimeout(() => {
    mousedown.value = true
    mouseDownTimer = null
  }, 100)
  originX = e.pageX
  originY = e.pageY
  document.addEventListener('mousemove', handleMousemove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMousemove = (e: MouseEvent) => {
  translateX = e.pageX - originX + lastX
  translateY = e.pageY - originY + lastY
  contentRef.value!.style.transform = `translate(${translateX}px, ${translateY}px)`
}

const handleMouseUp = (e: MouseEvent) => {
  mouseDownTimer !== null && clearTimeout(mouseDownTimer)
  mousedown.value = false
  document.removeEventListener('mousemove', handleMousemove)
  document.removeEventListener('mouseup', handleMouseUp)
  lastX = e.pageX - originX + lastX
  lastY = e.pageY - originY + lastY
}
</script>
