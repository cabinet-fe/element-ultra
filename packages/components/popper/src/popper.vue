<template>
  <slot />
</template>

<script lang="ts" setup>
import { provide, shallowRef } from 'vue'
import { POPPER_INJECTION_KEY } from './tokens'
import type { Instance } from '@popperjs/core'
import type { Measurable } from './popper'

defineOptions({
  name: 'ElPopperProvider',
  inheritAttrs: false
})

const triggerRef = shallowRef<Measurable>()

const popperInstanceRef = shallowRef<Instance>()

const contentRef = shallowRef<HTMLElement>()

provide(POPPER_INJECTION_KEY, {
  triggerRef,
  popperInstanceRef,
  contentRef
})

defineExpose({
  triggerRef,
  popperInstanceRef,
  contentRef
})
</script>
