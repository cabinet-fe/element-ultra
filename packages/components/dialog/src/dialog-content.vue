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
      <slot name="title">
        <span :class="ns.e('title')">
          {{ title }}
        </span>
      </slot>

      <el-icon @click="$emit('close')" v-if="showClose" :class="ns.e('close')">
        <component :is="closeIcon || Close" />
      </el-icon>
    </div>
    <div :class="ns.e('body')">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import { CloseComponents } from '@element-ultra/utils'
import { dialogContentProps } from './dialog-content'

import { elDialogInjectionKey } from './token'

const { Close } = CloseComponents

defineProps(dialogContentProps)

const { headerRef, ns, style } = inject(elDialogInjectionKey, undefined)!
</script>
