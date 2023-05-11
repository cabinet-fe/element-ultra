<template>
  <teleport to="body">
    <div
      v-if="visible"
      :class="ns.e('align-adjuster')"
      :style="style"
      ref="adjusterRef"
    >
      <ElRadioGroup
        :model-value="column!.align || 'left'"
        @update:model-value="column!.align = $event"
        @change="close"
      >
        <ElRadio value="left">左</ElRadio>
        <ElRadio value="center">中</ElRadio>
        <ElRadio value="right">右</ElRadio>
      </ElRadioGroup>

      <slot v-bind="{ column: column! }" />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { inject, nextTick, shallowReactive, shallowRef } from 'vue'
import { ElRadio, ElRadioGroup } from 'components/radio'
import type { InternalColumn } from './utils'
import { dataTableToken } from './token'
const { ns } = inject(dataTableToken)!

const visible = shallowRef(false)

const style = shallowReactive({
  left: '',
  top: ''
})

let column = shallowRef<InternalColumn>()
const adjusterRef = shallowRef<HTMLElement>()

const close = () => {
  visible.value = false
}

defineExpose({
  /** 打开弹框 */
  open(el: HTMLElement, _column: InternalColumn) {
    if (_column.key.startsWith('$')) return

    visible.value = true

    const { left, right, bottom, width } = el.getBoundingClientRect()

    // 判断当前的元素是在左半区还是右半区
    let inLeft = left + width / 2 < window.innerWidth / 2

    nextTick(() => {
      if (inLeft) {
        style.left = left + 'px'
      } else {
        style.left = right - adjusterRef.value!.offsetWidth + 'px'
      }
      style.top = bottom + 4 + 'px'
    })

    column.value = _column
  },

  close
})
</script>
