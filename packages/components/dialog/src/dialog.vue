<template>
  <teleport to="body" :disabled="!appendToBody">
    <transition
      name="dialog-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <el-overlay
        v-show="visible"
        :mask="modal"
        :overlay-class="modalClass"
        :z-index="zIndex"
        @click="onModalClick"
      >
        <el-dialog-content
          v-if="rendered"
          v-bind="$attrs"
          :center="center"
          :close-icon="closeIcon"
          :draggable="draggable"
          :fullscreen="fullscreen"
          :show-close="showClose"
          :style="style"
          :title="title"
          @close="handleClose"
        >

        </el-dialog-content>
      </el-overlay>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, ref, provide, useSlots, shallowRef } from 'vue'
import { ElOverlay } from '@element-ultra/components/overlay'
import { useNamespace, useDraggable } from '@element-ultra/hooks'
import ElDialogContent from './dialog-content.vue'
import { dialogProps, dialogEmits } from './dialog'
import { dialogInjectionKey } from './token'
import { useDialog } from './use-dialog'

import type { SetupContext, Ref } from 'vue'
import type { DialogEmits } from './dialog'

defineOptions({
  name: 'ElDialog',
  inheritAttrs: false
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)
const slots = useSlots()

const ns = useNamespace('dialog')
const dialogRef = shallowRef<HTMLElement | null>(null)
const headerRef = shallowRef<HTMLElement | null>(null)

const dialog = useDialog(
  props,
  { emit } as SetupContext<DialogEmits>,
  dialogRef as Ref<HTMLElement>
)
const {
  visible,
  afterEnter,
  afterLeave,
  beforeLeave,
  style,
  handleClose,
  rendered,
  onModalClick
} = dialog

provide(dialogInjectionKey, {
  dialogRef,
  headerRef,
  ns,
  rendered,
  style,
  slots
})

const draggable = computed(() => props.draggable && !props.fullscreen)

useDraggable(
  dialogRef as Ref<HTMLElement>,
  headerRef as Ref<HTMLElement>,
  draggable
)
</script>
