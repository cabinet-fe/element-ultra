<template>
  <div :class="ns.b()" :style="`height: ${theight}px`">
    <table>
      <colgroup v-if="editable">
        <col style="width: 60px; text-align: center" />
        <col v-if="showIndex" style="width: 60px; text-align: center" />
        <col
          v-for="column in filteredColumns"
          :style="{
            width: column.width + 'px',
            minWidth:
              (column.width ? column.width : column.minWidth || 100) + 'px'
          }"
        />
      </colgroup>

      <thead :class="ns.e('header')">
        <tr :class="ns.e('header-row')">
          <th v-if="editable" style="z-index: 2; text-align: center">
            <el-checkbox
              v-if="multiple"
              :model-value="allChecked"
              @change="toggleAllChecked"
              :indeterminate="indeterminate"
            />
          </th>
          <th v-if="showIndex" style="text-align: center">序号</th>
          <th
            v-for="item in filteredColumns"
            :style="{ textAlign: item.align }"
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
          <td v-if="editable" style="text-align: center">
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
          <td v-if="showIndex" style="text-align: center">
            {{ index + 1 }}
          </td>
          <td
            v-for="item in getRowColumns(row, index)"
            :title="item.value"
            :style="`text-align: ${item.align ? item.align : 'left'}`"
          >
            <slot v-if="item.slot" :name="item.key" v-bind="{ row, index }" />

            <template v-else>
              {{ item.value }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, toRefs, shallowRef, shallowReactive } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectDisplayProps } from './table-select-display'
import { ElCheckbox } from '@element-ultra/components/checkbox'
import { ElRadio } from '@element-ultra/components/radio'
import { tableSelectKey } from './token'

const props = defineProps(tableSelectDisplayProps)

const ns = useNamespace('table-select-display')

const { rootProps } = inject(tableSelectKey)!
const { columnFilter } = rootProps
const { multiple, showIndex, valueKey, columns } = toRefs(rootProps)

// 弹框下的表格应用过滤
const filteredColumns = computed(() => {
  return columnFilter && props.editable
    ? columns.value.filter(columnFilter)
    : columns.value
})

const getRowColumns = (row: any, index: number) => {
  return filteredColumns.value.map(column => {
    let value = ''
    if (!column.slot) {
      let cellVal = column.key.split('.').reduce((acc: any, cur: string) => {
        acc = acc?.[cur]
        return acc
      }, row)
      value = column.render?.(row, index, cellVal) ?? cellVal
    }
    return {
      value,
      ...column
    } as any
  })
}

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
