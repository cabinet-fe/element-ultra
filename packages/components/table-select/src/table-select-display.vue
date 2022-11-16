<template>
  <el-scrollbar :class="[ns.b(), ns.m(size)]" :style="containerStyle">
    <table>
      <colgroup>
        <col v-if="editable" style="width: 60px; text-align: center" />
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
            :style="{
              textAlign: item.align,
              width: item.width + 'px',
              minWidth: (item.width ? item.width : item.minWidth || 100) + 'px'
            }"
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
              :checked="!!checkedKeys[row[valueKey]]"
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
            <ElNodeRender
              v-if="item.slot"
              :nodes="slots[item.slot]?.({ row, index }) || []"
            />
            <template v-else>
              {{ item.value }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { inject, computed, toRefs, shallowRef, shallowReactive } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { tableSelectDisplayProps } from './table-select-display'
import { ElCheckbox } from '@element-ultra/components/checkbox'
import { ElRadio } from '@element-ultra/components/radio'
import { ElScrollbar } from '@element-ultra/components/scrollbar'
import { tableSelectKey } from './token'
import ElNodeRender from '@element-ultra/components/node-render'

const props = defineProps(tableSelectDisplayProps)

const ns = useNamespace('table-select-display')

const { rootProps, slots, size } = inject(tableSelectKey)!
const { columnFilter } = rootProps
const { multiple, showIndex, valueKey, columns, dialogColumns } =
  toRefs(rootProps)

// 弹框下的表格应用过滤
const filteredColumns = computed(() => {
  if (dialogColumns?.value && props.editable) {
    return dialogColumns.value
  } else {
    return columnFilter && props.editable
      ? columns.value.filter(columnFilter)
      : columns.value
  }
})

const containerStyle = computed(() => {
  const { theight } = props

  let heightType = typeof theight

  return {
    height:
      heightType === 'number'
        ? theight + 'px'
        : heightType === 'string'
        ? theight
        : '100%'
  }
})

const getRowColumns = (row: any, index: number) => {
  return filteredColumns.value?.map(column => {
    let value = ''
    if (!column.slot) {
      let cellVal = column.key.split('.').reduce((acc: any, cur: string) => {
        acc = acc?.[cur]
        return acc
      }, row)
      value =
        column.render?.({
          row,
          index,
          val: cellVal,
          wrap: row
        }) ?? cellVal
    }
    return {
      value,
      ...column
    } as any
  })
}

// 多选相关逻辑---------
// 选择的数据的value值, 该数据用以在初始化时回显用(因为对象之间不可以判断直接相等)
let checkedKeys = shallowRef(shallowReactive<Record<string, any>>({}))

// 因为要跨分页, 所以需要通过以下的逻辑去判断
const allChecked = computed(() => {
  return props.data.every(item => {
    return !!checkedKeys.value[item[rootProps.valueKey]]
  })
})

const indeterminate = computed(() => {
  return props.data.some(item => !!checkedKeys.value[item[rootProps.valueKey]]) && !allChecked.value
})

const toggleAllChecked = (checked: boolean) => {
  const { data } = props
  const { valueKey } = rootProps
  if (checked) {
    data.forEach(item => checkedKeys.value[item[valueKey]] = item)
  } else {
    data.forEach(item => {
      delete checkedKeys.value[ item[valueKey] ]
    })
  }
}

const toggleChecked = (checked: boolean, row: any) => {
  const { valueKey } = rootProps
  if (checked) {
    checkedKeys.value[row[valueKey]] = row
  } else {
    delete checkedKeys.value[row[valueKey]]
  }
}

// 单选相关逻辑
let selectedKey = shallowRef<string>()

const handleClickRow = (row: any) => {
  const { editable } = props
  if (!editable) return
  if (multiple.value) {
    toggleChecked(!checkedKeys.value[row[valueKey.value]], row)
  } else {
    selectedKey.value = row[valueKey.value]
  }
}

// 通用
const getValue = () => {
  const { valueKey, multiple } = rootProps
  const { data } = props

  return multiple
    ? Object.values(checkedKeys.value)
    : data.find(item => selectedKey.value === item[valueKey])
}

const clear = () => {
  checkedKeys.value = shallowReactive({})
  selectedKey.value = undefined
}

defineExpose({
  getValue,
  clear
})
</script>
