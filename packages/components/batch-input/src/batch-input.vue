<template>
  <ul :class="ns.b()" @blur.capture="handleEmitValue" tabindex="0">
    <li v-if="isEmpty">
      <el-button style="width: 100%" :icon="Plus" @click="handleAdd(0)">{{ placeholder }}</el-button>
    </li>

    <li
      :class="ns.e('item')"
      v-for="(item, index) of list"
      :key="item._id"
      tabindex="0"
    >
      <slot v-bind="{ item, index }" />

      <el-button-group :class="ns.e('operation')">
        <el-button
          :icon="Minus"
          circle
          :disabled="batchInputDisabled"
          @click="handleRemove(index)"
        ></el-button>
        <el-button
          :icon="Plus"
          circle
          :disabled="batchInputDisabled"
          @click="handleAdd(index)"
        ></el-button>
      </el-button-group>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import {
  useDisabled,
  useEventWatch,
  useFormItem,
  useNamespace,
  useSize
} from '@element-ultra/hooks'
import { batchInputProps, batchInputEmits } from './batch-input'
import { Plus, Minus } from '@element-plus/icons-vue'
import {
  computed,
  isReactive,
  provide,
  shallowReactive,
  shallowRef,
  watch
} from 'vue'
import { ElButton, ElButtonGroup } from '@element-ultra/components/button'
import {  formKey } from '@element-ultra/tokens'

defineOptions({
  name: 'ElBatchInput'
})

let uniqueId = 0

const props = defineProps(batchInputProps)
const emit = defineEmits(batchInputEmits)

const ns = useNamespace('batch-input')



const list = shallowRef<any[]>([])

const isEmpty = computed(() => {
  return !list.value.length
})

const [setEvent] = useEventWatch(
  () => props.modelValue,
  {
    onChangeNotByEvent(v) {
      if (!v) return
      list.value = v.map(item => {
        let ret = isReactive(item) ? item : shallowReactive(item)
        if (!ret._id) {
          ret._id = uniqueId++
        }
        return ret
      })
    }
  },
  { immediate: true }
)

const { formItem, form } = useFormItem()
const inputSize = useSize({ props })
const batchInputDisabled = useDisabled()
const provideObj = {
  ...form,
  props: shallowReactive<Record<string, any>>({})
}

watch([() => batchInputDisabled.value, () => inputSize.value, form?.props] as const, ([disabled, size, props]) => {
  Object.assign(provideObj.props, props)
  provideObj.props.disabled = disabled
  provideObj.props.size = size
})
// TODO 修复此处的类型忽略
// @ts-ignore
provide(formKey, provideObj)

const handleEmitValue = () => {
  setEvent(true)
  emit('update:modelValue', list.value)
  formItem?.validate()
}

const handleAdd = (index: number) => {
  list.value = [
    ...list.value.slice(0, index + 1),
    shallowReactive({ _id: uniqueId++ }),
    ...list.value.slice(index + 1)
  ]
}

const handleRemove = (index: number) => {
  setEvent(true)
  list.value = [...list.value.slice(0, index), ...list.value.slice(index + 1)]
}
</script>
