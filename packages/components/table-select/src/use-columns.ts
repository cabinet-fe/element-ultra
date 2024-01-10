import { ElCheckbox } from '@element-ultra/components/checkbox'
import { ElRadio } from '@element-ultra/components/radio'
import type { TableColumn } from '@element-ultra/components/table'
import { h, ComputedRef, computed, ShallowRef } from 'vue'
import type { TableSelectProps } from './table-select'
import { getChainValue } from '@element-ultra/utils'
interface Options {
  allChecked: ComputedRef<boolean>
  indeterminate: ComputedRef<boolean>
  props: TableSelectProps
  selected: ShallowRef<Record<string, any> | null>
  checkedData: ShallowRef<Record<string, any>>
  toggleAllChecked: (check: boolean) => void
  handleToggleCheck: (row: any, rowIndex: number) => void
  setSelectedData: (row: any) => void
}

export default function useColumns(options: Options) {
  const {
    props,
    allChecked,
    indeterminate,
    checkedData,
    selected,
    toggleAllChecked,
    handleToggleCheck,
    setSelectedData
  } = options

  // 列
  const columns = computed(() => {
    const { valueKey, multiple, columnFilter, rowDisabled } = props

    const extra: TableColumn[] = []
    if (multiple) {
      extra.push({
        name: () => {
          return h(ElCheckbox, {
            modelValue: allChecked.value,
            indeterminate: indeterminate.value,
            'onUpdate:modelValue'(v) {
              toggleAllChecked(v as boolean)
            }
          })
        },
        align: 'center',
        fixed: 'left',
        width: 60,
        render: ({ row, index }) =>
          h(ElCheckbox, {
            checked: !!checkedData.value[getChainValue(row, valueKey)],
            disabled: rowDisabled?.(row, index),
            onClick: (e: MouseEvent) => {
              e.stopPropagation()
            },
            onChange: () => {
              handleToggleCheck(row, index)
            }
          }),
        key: '$_check'
      })
    } else {
      extra.push({
        name: '单选',
        align: 'center',
        fixed: 'left',
        width: 60,
        render: ({ row, index }) => {
          const { valueKey } = props
          const disabled = rowDisabled?.(row, index)
          return h(ElRadio, {
            value: row[valueKey],
            disabled,
            onClick(e: MouseEvent) {
              e.stopPropagation()
            },
            onChange() {
              !disabled && setSelectedData(row)
            },
            modelValue: selected.value?.[valueKey]
          })
        },
        key: '$_selection'
      })
    }

    if (props.showIndex) {
      extra.push({
        name: '序号',
        key: '$_index',
        align: 'center',
        fixed: 'left',
        width: 60,
        render: ({ index }) => index + 1
      })
    }

    return [
      ...extra,
      ...(columnFilter
        ? props.columns.filter(columnFilter)
        : props.dialogColumns || props.columns)
    ]
  })

  return columns
}
