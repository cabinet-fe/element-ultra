import { computed, shallowReactive, watch } from 'vue'
import type { DataTableEmits, DataTableProps } from '../data-table'

export default function useState(props: DataTableProps, emit: DataTableEmits) {
  const store = shallowReactive({
    /** 多选时选中的数据 */
    checked: shallowReactive(new Set<any>(props.checked)),
    /** 单选时选中的数据 */
    selected: props.selected as any,
    /** 排序 */
    sortKeys: shallowReactive<Record<string, 'asc' | 'dsc' | 'default'>>({})
  })

  watch(
    () => props.checked,
    checked => {
      store.checked = shallowReactive(new Set<any>(checked))
    }
  )
  watch(
    () => props.selected,
    selected => {
      store.selected = selected
    }
  )

  const sortTable = {
    dsc: 'asc',
    asc: 'default',
    default: 'dsc'
  } as const

  const handleSort = (key: string) => {
    store.sortKeys[key] = sortTable[store.sortKeys[key] || 'default']
    emit('sort', store.sortKeys)
  }

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
    let checked =
      typeof props.checkable === 'function'
        ? props.data.filter(props.checkable)
        : props.data

    // 直接替换性能最高
    store.checked = shallowReactive(new Set(checked))
    emit('check', checked)
  }

  const clearChecked = () => {
    store.checked.clear()
    emit('check', Array.from(store.checked))
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

    // Set -> Array
    emit('check', Array.from(checked))
  }

  // 单选相关逻辑

  /** 单选切换 */
  const toggleSelect = (item: null | any) => {
    store.selected = item === null || store.selected === item ? null : item

    emit('select', store.selected)
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
    toggleSelect,

    /** 排序 */
    handleSort
  }
}

export type UseStateReturned = ReturnType<typeof useState>
