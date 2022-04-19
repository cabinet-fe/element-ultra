import { computed, h, shallowRef, type ShallowRef } from 'vue'
import type { ProTableProps } from './pro-table'
import { ElIcon } from '@element-ultra/components/icon'
import { ArrowRight } from '@element-plus/icons-vue'

export default function usePreColumns(props: ProTableProps, tableRef: ShallowRef<any>) {
  const preColumns = computed(() => {
    const { showIndex, checkable, selectable } = props
    let result: any[] = []

    if (showIndex) {
      result.unshift({
        type: 'index',
        width: 60,
        key: '$index',
        name: '序号',
        align: 'center'
      })
    }
    if (checkable) {
      result.unshift({
        type: 'selection',
        width: 60,
        key: '$checkbox',
        align: 'center',
        fixed: 'left',
        checkable: checkable instanceof Function ? checkable : undefined
      })
    } else if (selectable) {
      result.unshift({
        type: 'select',
        width: 60,
        key: '$radio',
        align: 'center',
        fixed: 'left'
      })
    }

    return result
  })

  const allExpanded = shallowRef(props.defaultExpandAll)

  let expandClasses = computed(() => {
    let ret = 'el-table__expand-icon'
    if (allExpanded.value) {
      ret += ' el-table__expand-icon--expanded'
    }
    return ret
  })

  const expandColumn = {
    type: 'expand',
    width: 40,
    key: '$expand',
    fixed: 'left',
    name: () => {
      return [
        h(
          ElIcon,
          {
            class: expandClasses.value,
            onClick: () => {
              tableRef.value?.toggleAllRowsExpansion()
              allExpanded.value = !allExpanded.value
            }
          },
          {
            default: () => {
              return [h(ArrowRight)]
            }
          }
        )
      ]
    }
  } as any

  return [expandColumn, preColumns] as const
}
