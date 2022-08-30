<template>
  <ul :class="ns.b()">
    <li v-if="isEmpty">
      <el-button :icon="Plus" @click="handleAdd(0)">新增</el-button>
    </li>

    <li
      :class="ns.e('item')"
      v-for="(item, index) of modelValue"
      :key="item._id"
    >
      <slot v-bind="{ item, index }" />

      <el-button-group :class="ns.e('operation')">
        <el-button
          :icon="Minus"
          circle
          @click="handleRemove(index)"
        ></el-button>
        <el-button :icon="Plus" circle @click="handleAdd(index)"></el-button>
      </el-button-group>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { useEventWatch, useNamespace } from '@element-ultra/hooks'
import { batchInputProps, batchInputEmits } from './batch-input'
import { Plus, Minus } from '@element-plus/icons-vue'
import { computed, isReactive, shallowReactive } from 'vue'
import { ElButton, ElButtonGroup } from '@element-ultra/components/button'

defineOptions({
  name: 'ElBatchInput'
})

let uniqueId = 0

const props = defineProps(batchInputProps)
const emit = defineEmits(batchInputEmits)

const ns = useNamespace('batch-input')

const isEmpty = computed(() => {
  return !props.modelValue || !props.modelValue.length
})

// TODO
let a = true
const [setEvent] = useEventWatch(
  () => props.modelValue,
  {
    onChangeNotByEvent(v) {
      if (!v || !a) return
      a = false
      emit(
        'update:modelValue',
        v.map(item => shallowReactive(item))
      )
    }
  },
  { immediate: true }
)

const handleAdd = (index: number) => {
  setEvent(true)
  const { modelValue = [] } = props
  emit('update:modelValue', [
    ...modelValue.slice(0, index + 1),
    shallowReactive({ _id: uniqueId++ }),
    ...modelValue.slice(index + 1)
  ])
}

const handleRemove = (index: number) => {
  setEvent(true)
  const { modelValue = [] } = props
  emit('update:modelValue', [
    ...modelValue.slice(0, index),
    ...modelValue.slice(index + 1)
  ])
}
</script>
