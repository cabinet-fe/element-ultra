import { onBeforeUnmount, onMounted, shallowRef, watch } from "vue"
import type { TableSelectProps } from "./table-select"

interface Options {
  props: TableSelectProps
}
export default function useTableHeight(options: Options) {
  const { props } = options

  /** 表格高度 */
  const tableHeight = shallowRef('')

  /** 搜索框 */
  const searcherRef = shallowRef<HTMLElement>()

  const calcTableHeight = () => {
    const { api, pagination } = props
    let acc = 0
    // 有分页标签则加上分页的高度
    if (api && pagination) {
      acc += 28
    }

    if (searcherRef.value) {
      acc += searcherRef.value.offsetHeight
    }

    tableHeight.value = `calc(100% - ${acc}px)`
  }

  const obs = new ResizeObserver(() => {
    calcTableHeight()
  })

  watch(searcherRef, (searcher, oldSearcher) => {
    oldSearcher && obs.unobserve(oldSearcher)
    searcher && obs.observe(searcher)
  })

  onMounted(() => {
    calcTableHeight()
  })

  onBeforeUnmount(() => {
    obs.disconnect()
  })


  return {
    tableHeight,
    searcherRef
  }
}
