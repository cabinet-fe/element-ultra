<template>
  <div :class="ns.b()">
    <div
      :class="ns.e('input')"
      contenteditable="true"
      @focus="handleFocus"
      @[blurEvent]="handleBlur"
      @[overEvent]="handleHover"
      ref="inputRef"
    >
      <span v-if="!multiple">{{ multiple ? undefined : label }}</span>
      <el-tag
        v-else
        v-for="tag in selected"
        :key="tag.id"
        closable
        type="info"
        @close="handleClose(tag)"
        :class="ns.e('tag')"
      >
        {{ tag.label }}
      </el-tag>
      <el-icon :class="ns.e('icon')">
        <arrow-down v-show="icon==='down'"/>
        <arrow-up v-show="icon==='up'" />
        <close v-show="icon==='close'" />
      </el-icon>
    </div>
    <transition name="el-zoom-in-top">
      <div
        :class="ns.e('dropdown')"
        v-show="menuVisible"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
      >
        <span :class="ns.e('triangle')"></span>
        <el-tree
          :data="data"
          :check-strictly="true"
          ref="treeRef"
          node-key="id"
          default-expand-all
          :props="{ value: 'id', children: 'children', label: 'label' }"
          @node-click="handleNodeClick"
          @check-change="handleNodeCheck"
          :show-checkbox="multiple"
          :class="ns.e('tree')"
        />
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@element-ultra/hooks'
import {
  useSlots,
  ref,
  watch,
  computed,
  onMounted,
  nextTick,
  shallowRef,
} from 'vue'
import { treeSelectProps } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElInput from '@element-ultra/components/input'
import ElSelect from '@element-ultra/components/select'
import ElIcon from '@element-ultra/components/icon'
import { Close, Edit, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
defineOptions({
  name: 'ElTreeSelect',
})

const props = defineProps(treeSelectProps)

const menuVisible = ref(false)
const icon = ref<'down'|'up'|'close'>('down')

let blurEvent = ref('blur')
let overEvent = computed(() => { return clearable ? 'mouseover' : '' })

const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: string | number,
    label: string,
    item: Record<string, any>
  ): void
  (
    e: 'update:modelValue',
    value: any[],
    label: any[],
    item: Record<string, any>[]
  ): void
}>()

let { data, effect, modelValue, multiple, isize, clearable } = props

const ns = useNamespace('tree-select')

const treeRef = shallowRef<InstanceType<typeof ElTree>>()

let labelTem = undefined as any


const label = computed(() => {
  let { modelValue, data } = props
  if (labelTem) return labelTem
  return treeRef.value?.getCurrentKey() || modelValue
})

const selected = computed(() => {
  // if (!treeRef.value?.getCheckedNodes()) return modelValue
  const nodes = treeRef.value?.getCheckedNodes()

  return nodes
})

const changeCkecked = (data: any, checked: boolean = true) => {
  if (Array.isArray(data)) {
    data?.forEach((item) => {
      treeRef.value?.setChecked(item.id, checked)
    })
  } else {
    treeRef.value?.setChecked(data.id, checked)
  }
}

const handleFocus = () => {
  menuVisible.value = true
  icon.value = 'up'
}

const handleBlur = () => {
  menuVisible.value = false
  icon.value = 'down'
}

const handleEnter = () => {
  blurEvent.value = ''
}

const handleLeave = () => {
  blurEvent.value = 'blur'
  inputRef.value?.focus()
}

const handleHover = () => {
  icon.value = 'close'
}

const handleNodeClick = (data: any) => {
  labelTem = data.label
  emit('update:modelValue', data.id, data.label, data)
  nextTick(() => {
    labelTem = undefined
  })
}

const handleNodeCheck = (data: any) => {
  const nodes = treeRef.value?.getCheckedNodes() ?? []
  const nodesValues = nodes.map((item) => item[props.valueKey])
  const nodesLabels = nodes.map((item) => item[props.labelKey])
  emit('update:modelValue', nodesValues, nodesLabels, nodes)
}

const handleClose = (data: any) => {
  selected.value.splice(selected.value.indexOf(data), 1)
  changeCkecked(data, false)
}

const inputRef = ref<HTMLInputElement>()
</script>
