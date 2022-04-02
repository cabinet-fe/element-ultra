import { computed } from 'vue'
import type { ProTableProps } from './pro-table'

export default function usePreColumns(props: ProTableProps) {
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
        checkable: checkable instanceof Function ? checkable : undefined
      })
    } else if (selectable) {
      result.unshift({
        type: 'select',
        width: 60,
        key: '$radio',
        align: 'center'
      })
    }

    return result
  })

  return preColumns
}
