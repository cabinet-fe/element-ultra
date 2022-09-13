import ElCheckbox from '@element-ultra/components/checkbox'
import { computed, h, shallowReactive, useSlots } from 'vue'
import type { DataTableColumn, DataTableProps } from '../data-table'
import { bfs } from '../utils'
import type { UseStateReturned } from './use-state'

/**
 * 转化列为组件所需的数据结构
 * @param props 表格属性
 */
export default function useColumns(
  props: DataTableProps,
  state: UseStateReturned
) {
  const {
    allChecked,
    someChecked,
    checkAll,
    clearChecked,
    toggleItemCheck,
    toggleSelect,
    store
  } = state

  /** 多级表头的二维结构 */
  const headerRows = computed(() => bfs(props.columns))

  // 深度优先遍历获取列的叶子节点(叶子节点才会在最终被data读取其key)
  const leafColumns = computed(() => {
    let result: DataTableColumn[] = []
    const recursive = (arr: DataTableColumn[]) => {
      arr.forEach(item => {
        if (!item.children) {
          if (!item.width || !item.minWidth) {
          }
          return result.push(item)
        }
        recursive(item.children)
      })
    }
    recursive(props.columns)
    return result
  })

  /** 额外列 , 一般是序号单选多选 */
  const extraColumns = computed(() => {
    const { checkable, selectable, showIndex } = props

    let result: DataTableColumn[] = []

    if (showIndex !== false) {
      result.push({
        name: () => '序号',
        key: '$_index',
        width: 60,
        fixed: 'left',
        align: 'center',
        render: (_, __, index) => index + 1
      })
    }

    // 多选和单选只能有一个, 且多选优先级更高
    if (checkable !== false) {
      // 高性能写法
      const render =
        checkable === true
          ? (_: any, row: any) =>
              h(ElCheckbox, {
                modelValue: store.checked.has(row),
                'onUpdate:modelValue': v => {
                  toggleItemCheck(row, v as boolean)
                }
              })
          : (value: any, row: any, index: number) =>
              h(ElCheckbox, {
                disabled: !checkable(row, index),
                modelValue: store.checked.has(row),
                'onUpdate:modelValue': v => {
                  toggleItemCheck(row, v as boolean)
                }
              })
      result.push({
        name: () =>
          h(ElCheckbox, {
            modelValue: allChecked.value,
            indeterminate: someChecked.value,
            'onUpdate:modelValue': v => {
              v ? checkAll() : clearChecked()
            }
          }),
        key: '$_checkbox',
        width: 60,
        fixed: 'left',
        align: 'center',
        render
      })
    } else if (selectable !== false) {
      const render =
        selectable === true
          ? (_: any, row: any) =>
              h(ElCheckbox, {
                modelValue: store.selected === row,
                'onUpdate:modelValue': v => {
                  v ? toggleSelect(row) : toggleSelect(false)
                }
              })
          : (value: any, row: any, index: number) =>
              h(ElCheckbox, {
                disabled: !selectable(row, index),
                modelValue: store.selected === row,
                'onUpdate:modelValue': v => {
                  v ? toggleSelect(row) : toggleSelect(false)
                }
              })

      result.push({
        name: () => '单选',
        key: '$_radio',
        width: 60,
        fixed: 'left',
        render
      })
    }

    return result
  })

  const slots = useSlots()

  const columns = computed(() => {
    let left: DataTableColumn[] = []
    let center: DataTableColumn[] = []
    let right: DataTableColumn[] = []

    // TODO算出每一列的长度
    // TODO拖拽排序列
    extraColumns.value.concat(leafColumns.value).forEach(column => {
      let reactiveColumn = shallowReactive({
        ...column
      })
      if (!column.render) {
        if (column.slot) {
          reactiveColumn.render = (value, row, index) => {
            return slots[column.slot!]?.({ row, index, value })
          }
        } else {
          reactiveColumn.render = value => {
            return value
          }
        }
      }
      if (column.fixed === 'left') {
        return left.push(reactiveColumn)
      }
      if (column.fixed === 'right') {
        return right.push(reactiveColumn)
      }
      center.push(reactiveColumn)
    })

    console.log(left, center, right)

    return {
      left,
      center,
      right
    }
  })

  return {
    /** 多级表头的二维结构 */
    headerRows,
    /** 叶子列 */
    leafColumns,
    /** 额外的列 */
    extraColumns,
    /** 组合列, left, static, right */
    columns
  }
}

export type UseColumnsReturned = ReturnType<typeof useColumns>
