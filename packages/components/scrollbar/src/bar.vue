<template>
  <thumb
    :move="state.moveX"
    :ratio="state.ratioX"
    :size="state.width"
    :always="always"
  />
  <thumb
    :move="state.moveY"
    :ratio="state.ratioY"
    :size="state.height"
    vertical
    :always="always"
  />
</template>
<script lang="ts" setup>
import { shallowRef } from 'vue'

import Thumb from './thumb.vue'
import { barProps } from './bar'

defineProps(barProps)

let state = shallowRef({
  moveX: 0,
  moveY: 0,
  width: '0',
  height: '0',
  ratioX: 1,
  ratioY: 1
})

type UpdateCtx = typeof state.value

const updateStyle = (ctx: UpdateCtx) => {
  state.value = ctx
}

defineExpose({
  updateStyle
})
</script>
