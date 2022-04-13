<template>
  <div :class="ns.b()">
    {{modelValue}}
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectProps } from './table-select'

defineOptions({
  name: 'ElTableSelect'
})

const props = defineProps(tableSelectProps)

const { modelValue } = props

const emit = defineEmits<{

}>()

const ns = useNamespace('table-select')


defineExpose({

})
</script>
