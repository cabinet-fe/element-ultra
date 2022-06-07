<template>
  <div :class="ns.b()" :style="`height: ${theight}px`">
    <table >
      <thead :class="ns.e('header')">
        <tr :class="ns.e('header-row')">
          <th v-if="editable" style="z-index: 2">
            <el-checkbox
              v-if="multiple"
              :model-value="allChecked"
              @change="toggleAllChecked"
              :indeterminate="indeterminate"
            />
          </th>
          <th v-if="showIndex" :class="ns.e('auto')">序号</th>
          <th
            v-for="item in columns"
            :class="{ [ns.e('auto')]: !item.width }"
            :style="{ width: `${item.width}px` }"
          >
            {{ item.name }}
          </th>
        </tr>
      </thead>

      <tbody :class="ns.e('body')">
        <tr
          v-for="(row, index) in data"
          :class="ns.e('row')"
          @click="handleClickRow(row)"
        >
          <td v-if="editable">
            <el-checkbox
              v-if="multiple"
              :value="row[valueKey]"
              :checked="checkedKeys.has(row[valueKey])"
              @change="toggleChecked($event, row)"
              @click.stop
            />
            <el-radio
              v-else
              :value="row[valueKey]"
              :model-value="selectedKey"
            />
          </td>
          <td v-if="showIndex" :class="ns.e('auto')">
            {{ index + 1 }}
          </td>
          <td
            v-for="item in columns"
            :class="{ [ns.e('auto')]: !item.width }"
            :style="{ width: `${item.width}px` }"
          >
            {{
              item.render
                ? item.render(row, index, row[item.key])
                : row[item.key]
            }}
            <div v-if="item.key === 'action'"><slot name="action"></slot></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="tsx" setup>
import { inject, computed, toRefs, shallowRef, shallowReactive } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectDisplayProps } from './table-select-display'
import { ElCheckbox } from '@element-ultra/components/checkbox'
import { ElRadio } from '@element-ultra/components/radio'
import { tableSelectKey } from './token'

const props = defineProps(tableSelectDisplayProps)

const ns = useNamespace('table-select-display')

const { rootProps } = inject(tableSelectKey)!
const { multiple, showIndex, columns, valueKey } = toRefs(rootProps)

// 多选相关逻辑---------
// 选择的数据的value值, 该数据用以在初始化时回显用(因为对象之间不可以判断直接相等)
let checkedKeys = shallowReactive(new Set<string | number>())

const allChecked = computed(() => {
  return checkedKeys.size === props.data.length
})
const indeterminate = computed(() => {
  return checkedKeys.size > 0 && !allChecked.value
})
const toggleAllChecked = (checked: boolean) => {
  const { data } = props
  const { valueKey } = rootProps
  if (checked) {
    data.forEach(item => checkedKeys.add(item[valueKey]))
  } else {
    checkedKeys.clear()
  }
}

const toggleChecked = (checked: boolean, row: any) => {
  const { valueKey } = rootProps
  if (checked) {
    checkedKeys.add(row[valueKey])
  } else {
    checkedKeys.delete(row[valueKey])
  }
}

// 单选相关逻辑
let selectedKey = shallowRef<string>()

const handleClickRow = (row: any) => {
  const { editable } = props
  if (!editable) return
  if (multiple.value) {
    toggleChecked(!checkedKeys.has(row[valueKey.value]), row)
  } else {
    selectedKey.value = row[valueKey.value]
  }
}

// 通用
const getValue = ():
  | Record<string, any>[]
  | Record<string, any>
  | undefined => {
  const { valueKey, multiple } = rootProps
  const { data } = props

  return multiple
    ? data.filter(item => checkedKeys.has(item[valueKey]))
    : data.find(item => selectedKey.value === item[valueKey])
}

const clear = () => {
  checkedKeys.clear()
  selectedKey.value = undefined
}

defineExpose({
  getValue,
  clear
})
</script>
