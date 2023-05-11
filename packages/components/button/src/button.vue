<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('disabled', _disabled),
      ns.is('loading', loading),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('has-bg', bg)
    ]"
    :aria-disabled="_disabled || loading"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { ElIcon } from 'components/icon'
import { useDisabled, useNamespace, useSize } from 'hooks'
import { buttonGroupContextKey } from 'tokens'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'ElButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const buttonGroupContext = inject(buttonGroupContextKey, undefined)

const ns = useNamespace('button')
const _size = useSize({
  props,
  fallback: computed(() => buttonGroupContext?.size)
})
const _disabled = useDisabled({ props })
const _ref = ref<HTMLButtonElement>()

const _type = computed(() => props.type || buttonGroupContext?.type || '')

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: _size,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled
})
</script>
