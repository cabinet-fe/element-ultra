import { shallowReactive, type ShallowRef } from 'vue'
import type { TreeSelectProps } from './tree-select'
import type { ElTree, TreeNodeData } from '@element-ultra/components/tree'

export default function useFilter(
  props: TreeSelectProps,
  tree: ShallowRef<InstanceType<typeof ElTree> | undefined>
) {
  const filterer = shallowReactive({
    /** 查询条件 */
    query: '',
    /** 是否正在查询中 */
    filtering: false,
    /** 是否已聚焦 */
    focus: false
  })

  const filterMethod = (query: string, node: TreeNodeData) => {
    const { labelKey } = props
    if (!query) return true
    return node[labelKey].includes(query)
  }

  const handleCompositionStart = () => {
    filterer.filtering = true
  }

  const handleCompositionEnd = () => {
    filterer.filtering = false
  }

  const handleFiltererFocus = () => {
    filterer.focus = true
  }

  const handleFiltererBlur = () => {
    filterer.focus = false

    // if (filterer.query) {
    //   filterer.query = ''
    //   tree.value?.filter('')
    // }
  }

  /** 过滤 */
  const handleFilter = (ev: any) => {
    tree.value?.filter(ev.target.value)
  }

  return {
    filterer,
    filterMethod,
    handleCompositionStart,
    handleCompositionEnd,
    handleFiltererFocus,
    handleFiltererBlur,
    handleFilter
  }
}
