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
    <div ref="headerRef" :class="ns.e('header')" @mousedown.self="handleMouseDown">
      <ElSlotsRender v-if="slots.title" :nodes="slots.title()" />
      <span v-else :class="ns.e('title')">
        {{ title }}
      </span>
      <!-- @ts-ignore -->
      <el-icon @click="$emit('close')" v-if="showClose" :class="ns.e('close')">
        <component :is="closeIcon || Close" />
      </el-icon>
    </div>
    <div
      @click.stop
      :class="ns.e('body')"
      :style="{ maxHeight: `calc(80vh - ${slots.footer ? 88 : 44}px)` }"
    >
      <ElSlotsRender :nodes="slots.default?.()" />
    </div>
    <div v-if="slots.footer" :class="ns.e('footer')">
      <ElSlotsRender :nodes="slots.footer?.()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, shallowRef } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import { ElSlotsRender } from '@element-ultra/components/slots-render'
import { CloseComponents } from '@element-ultra/utils'
import { dialogContentProps } from './dialog-content'

import { dialogInjectionKey } from './token'


const { Close } = CloseComponents

defineProps(dialogContentProps)

const { headerRef, ns, style, slots } = inject(dialogInjectionKey)!

const contentRef = shallowRef<HTMLElement>()

let originX = 0,
  originY = 0

let lastX = 0
let lastY = 0

let translateX = 0,
  translateY = 0

let mousedown = shallowRef(false)

const handleMouseDown = (e: MouseEvent) => {
  mousedown.value = true
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
  mousedown.value = false
  document.removeEventListener('mousemove', handleMousemove)
  document.removeEventListener('mouseup', handleMouseUp)
  lastX = e.pageX - originX + lastX
  lastY = e.pageY - originY + lastY
}
</script>
