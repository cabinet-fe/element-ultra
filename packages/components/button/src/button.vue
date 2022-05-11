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
    ]"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    type="button"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading"></slot>
      <el-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon">
      <component :is="icon" />
    </el-icon>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import {
  useDisabled,
  useFormItem,
  useNamespace,
  useSize,
} from '@element-ultra/hooks'
import { buttonGroupContextKey } from '@element-ultra/tokens'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'ElButton',
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const buttonGroupContext = inject(buttonGroupContextKey, undefined)
const ns = useNamespace('button')
const { form } = useFormItem()
const _size = useSize(computed(() => buttonGroupContext?.size))

const _disabled = useDisabled()
const _ref = ref<HTMLButtonElement>()

const _type = computed(() => {
  if (props.text) return 'text'
  if (props.type !== 'default') return props.type
  return buttonGroupContext?.type ?? 'default'
})

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}

defineExpose({
  /** @description button html element */
  $el: _ref,
  /** @description button size */
  size: _size,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled,
})
</script>
