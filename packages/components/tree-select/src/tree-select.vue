<template>
  <div :class="ns.b()" @mouseleave="hideMenu" @mouseenter="handleEnter">
    <div
      :class="ns.e('input')"
      @click="showMenu"
      @[closeEvent]="showClose"
      ref="inputRef"
    >
      <div :class="ns.e('content')">

        <el-tag
          v-if="multiple"
          v-for="tag in selected"
          :key="tag.id"
          closable
          type="info"
          @close="handleClose(tag)"
          :class="ns.e('tag')"
        >
          {{ tag.label }}
        </el-tag>
        <input type="text" :value="label" @input="handleInput" :class="ns.e('text')" placeholder="请输入..." v-else>
        <input type="text" v-model="text" :class="ns.e('text')" placeholder="请输入..." v-if="multiple && isFilter">
      </div>
      <el-icon :class="ns.e('icon')">
        <arrow-down v-show="icon === 'down'" />
        <arrow-up v-show="icon === 'up'" />
        <close :class="ns.e('close')" v-show="icon === 'close'" @click.stop="handleClear"/>
      </el-icon>
    </div>
    <transition name="el-zoom-in-top">
      <div
        :class="ns.e('dropdown')"
        v-show="menuVisible"
        @mouseenter="handleEnter"
      >
        <span :class="ns.e('triangle')"></span>
        <el-tree
          :data="data"
          :check-strictly="checkStrictly"
          ref="treeRef"
          node-key="id"
          default-expand-all
          :props="{ value: 'id', children: 'children', label: 'label' }"
          @node-click="handleNodeClick"
          @check-change="handleNodeCheck"
          :show-checkbox="multiple"
          :class="ns.e('tree')"
          :filter-method="filterMethod"
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
  nextTick,
  shallowRef,
} from 'vue'
import { treeSelectProps } from './tree-select'
import ElTree from '@element-ultra/components/tree'
import ElTag from '@element-ultra/components/tag'
import ElIcon from '@element-ultra/components/icon'
import { Close, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
defineOptions({
  name: 'ElTreeSelect',
})

const props = defineProps(treeSelectProps)

const menuVisible = ref(false)
const isFilter = ref(true)
const timer = ref<any>(null)

const icon = ref<'down' | 'up' | 'close'>('down')

const text = ref('')

let closeEvent = computed(() => {
  return clearable ? 'mouseover' : ''
})

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

let { data, effect, modelValue, multiple, isize, clearable, checkStrictly } =
  props

const ns = useNamespace('tree-select')

const treeRef = shallowRef<InstanceType<typeof ElTree>>()

let labelTem = undefined as any

const label = computed(() => {
  let { modelValue, data } = props
  if (labelTem) return labelTem
  return treeRef.value?.getCurrentKey()
})

const selected = computed(() => {
  return treeRef.value?.getCheckedNodes()
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

const showMenu = () => {
  menuVisible.value = true
  icon.value = 'up'
}

const hideMenu = () => {
  timer.value = setTimeout(() => {
    menuVisible.value = false
    icon.value = 'down'
  }, 100)
}

const handleEnter = () => {
  clearTimeout(timer.value)
}

const showClose = () => {
  icon.value = 'close'
}

const handleClear = () => {
  text.value = ''
  if(multiple) {
    changeCkecked(selected.value, false)
  }else {
    treeRef.value?.setCurrentKey(null)
  }
}

const handleInput = ($e: Event) => {
  treeRef.value!.filter($e.target?.value)
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

watch(text, (val) => {
  treeRef.value!.filter(val)
})
watch(() => selected.value, (cur, pre) => {
  isFilter.value = !cur.length
})

const filterMethod = (query: string, node: any) => {
  return node.label!.indexOf(query) !== -1
}
</script>
