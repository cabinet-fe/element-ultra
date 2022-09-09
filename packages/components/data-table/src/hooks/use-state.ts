import { computed, shallowReactive } from 'vue'
import type { DataTableProps } from '../data-table'

export default function useState(props: DataTableProps) {
  const store = shallowReactive({
    /** 多选时选中的数据 */
    checked: shallowReactive(new Set<any>([])),
    /** 单选时选中的数据 */
    selected: null as any
  })

  // 多选相关逻辑----------------------------------------
  /** 全选中 */
  const allChecked = computed(() => {
    return props.data?.length === store.checked.size
  })

  /** 部分选中 */
  const someChecked = computed(() => {
    return !!store.checked.size && !allChecked.value
  })

  const checkAll = () => {
    // 直接替换性能最高
    if (typeof props.checkable === 'function') {
      store.checked = shallowReactive(
        new Set(props.data.filter(props.checkable))
      )
    } else {
      store.checked = shallowReactive(new Set(props.data))
    }
  }

  const clearChecked = () => {
    store.checked.clear()
  }

  /**
   * 切换单项的选中
   * @param item 数据项
   * @param check 指定是否选中
   */
  const toggleItemCheck = (item: any, check?: boolean) => {
    const { checked } = store
    if (check === undefined) {
      checked.has(item) ? checked.delete(item) : checked.add(item)
    } else {
      check ? checked.add(item) : checked.delete(item)
    }
  }

  // 单选相关逻辑

  /** 单选切换 */
  const toggleSelect = (item: null | any) => {
    store.selected = item === null || store.selected === item ? null : item
  }

  return {
    store,
    /** 全选中 */
    allChecked,
    /** 部分选中 */
    someChecked,

    /** 选中全部数据 */
    checkAll,
    /** 清除所有选中 */
    clearChecked,
    /** 切换单项的选中 */
    toggleItemCheck,

    /** 单选切换 */
    toggleSelect
  }
}

export type UseStateReturned = ReturnType<typeof useState>
