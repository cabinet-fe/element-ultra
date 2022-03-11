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
      })
    }
    if (checkable) {
      result.unshift({
        type: 'selection',
        width: 60,
        key: '$checkbox',
      })
    } else if (selectable) {
      result.unshift({
        type: 'select',
        width: 60,
        key: '$radio'
      })
    }

    return result
  })

  return preColumns
}
