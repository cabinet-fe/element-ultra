import { shallowReactive, type ShallowRef } from 'vue'
import type { TreeSelectProps } from './tree-select'
import type { ElTree, TreeNodeData } from '@element-ultra/components/tree'

export default function useFilter(
  props: TreeSelectProps,
  tree: ShallowRef<InstanceType<typeof ElTree> | undefined>
) {
  const filterer = shallowReactive({
    /** 查询条件 */
    query: ''
  })

  const filterMethod = (query: string, node: TreeNodeData) => {
    const { labelKey } = props
    if (!query) return true
    return node[labelKey].includes(query)
  }

  /** 过滤 */
  const handleFilter = (v: string) => {
    tree.value?.filter(v)
  }

  return {
    filterer,
    filterMethod,
    handleFilter
  }
}
