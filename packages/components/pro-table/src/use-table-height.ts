import { computed, provide, shallowRef } from 'vue'
import type { ProTableProps } from './pro-table'
import { proTableHeightKey } from './token'
interface Options {
  props: ProTableProps
}
export default function useTableHeight(options: Options) {
  const { props } = options
  const toolsHeight = shallowRef(0)

  provide(proTableHeightKey, {
    setToolsHeight: (height: number) => {
      toolsHeight.value = height
    }
  })

  const tableHeight = computed(() => {
    if (!props.height) return

    let acc = 0
    if (toolsHeight.value) {
      acc += toolsHeight.value + 6
    }

    if (props.pagination) {
      acc += 28
    }

    return acc ? `calc(${props.height} - ${acc}px)` : props.height
  })

  return tableHeight
}
