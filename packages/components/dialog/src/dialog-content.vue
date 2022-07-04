<template>
  <div
    :class="[
      ns.b(),
      ns.is('fullscreen', fullscreen),
      ns.is('draggable', draggable),
      { [ns.m('center')]: center }
    ]"
    aria-modal="true"
    role="dialog"
    :aria-label="title || 'dialog'"
    :style="style"
    @click.stop
  >
    <div ref="headerRef" :class="ns.e('header')">
      <ElSlotsRender v-if="slots.title" :nodes="slots.title()" />
      <span v-else :class="ns.e('title')">
        {{ title }}
      </span>

      <el-icon @click="$emit('close')" v-if="showClose" :class="ns.e('close')">
        <component :is="closeIcon || Close" />
      </el-icon>
    </div>
    <div :class="ns.e('body')" :style="{ maxHeight: `calc(80vh - ${ slots.footer ? 88 : 44}px)` }">
      <ElSlotsRender :nodes="slots.default?.()" />
    </div>
    <div v-if="slots.footer" :class="ns.e('footer')">
      <ElSlotsRender :nodes="slots.footer?.()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import { ElSlotsRender } from '@element-ultra/components/slots-render'
import { CloseComponents } from '@element-ultra/utils'
import { dialogContentProps } from './dialog-content'

import { dialogInjectionKey } from './token'

const { Close } = CloseComponents

defineProps(dialogContentProps)

const { headerRef, ns, style, slots } = inject(dialogInjectionKey)!
</script>
