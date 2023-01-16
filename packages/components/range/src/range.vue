<template>
  <div :class="ns.b()">
    <ElInputNumber
      :model-value="modelValue?.[0]"
      @update:model-value="handleUpdate('start', $event)"
    />

    <span :class="ns.e('separator')">-</span>

    <ElInputNumber
      :model-value="modelValue?.[1]"
      @update:model-value="handleUpdate('end', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { rangeProps, rangeEmits } from './type'
import { useNamespace } from '@element-ultra/hooks'
import { ElInputNumber } from '@element-ultra/components/input-number'

defineOptions({
  name: 'ElRange'
})

const props = defineProps(rangeProps)
const emit = defineEmits(rangeEmits)

const ns = useNamespace('range')

const handleUpdate = (type: 'start' | 'end', v?: number) => {

  let [startVal, endVal] = props.modelValue ?? [undefined, undefined]
  if (type === 'start') {
    if (typeof v === 'number' && typeof endVal === 'number' && endVal < v) {
      endVal = v
    }
    emit('update:modelValue', [v ?? null, endVal ?? null])
  } else {
    if (typeof v === 'number' && typeof startVal === 'number' && startVal > v) {
      startVal = v
    }
    emit('update:modelValue', [startVal ?? null, v ?? null])
  }
}
</script>
