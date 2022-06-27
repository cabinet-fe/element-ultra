import { shallowRef, watch, nextTick, computed } from 'vue'
import type {
  ElTree,
  CheckedInfo,
  TreeNodeData
} from '@element-ultra/components/tree'
import type { TreeSelectProps } from './tree-select'
import { useFormItem } from '@element-ultra/hooks'

export default function useTreeSelect(props: TreeSelectProps, emit) {
  /** 树的引用 */
  const treeRef = shallowRef<InstanceType<typeof ElTree>>()
  const dropdownRef = shallowRef<HTMLDivElement>()
  /** 下拉框显隐 */
  const treeVisible = shallowRef(false)
  /** 是否已渲染 */
  const hasRendered = shallowRef(false)
  /** 通过事件更改的值 */
  const changedByEvent = shallowRef(false)

  const hovered = shallowRef(false)

  const handleMouseEnter = () => {
    hovered.value = true
  }

  const handleMouseLeave = () => {
    hovered.value = false
  }

  /** 是否可清除 */
  const clearable = computed(() => {
    const { modelValue } = props
    const hasValue = Array.isArray(modelValue)
      ? modelValue.length
      : !!(modelValue || modelValue === 0)

    return hasValue && hovered.value
  })

  // 只有通过用户事件触发的才调用
  watch(
    [() => props.modelValue, () => props.data],
    () => {
      if (changedByEvent.value) {
        return (changedByEvent.value = false)
      }

      nextTick(() => {
        setTreeChecked()
      })
    },
    { immediate: true }
  )

  type EmitModelValue = {
    (
      v: string | number,
      label: string,
      model: Record<string, any> | undefined
    ): void
    (
      v: (string | number)[],
      label: string[],
      model: Record<string, any>[]
    ): void
  }

  const { formItem } = useFormItem()
  const emitModelValue: EmitModelValue = (value, label, model) => {
    emit('update:modelValue', value, label, model)
    formItem?.validate()
  }

  /** 计算dropdown的位置 */
  const treeSelectRef = shallowRef<HTMLDivElement>()
  const dropdownStyle = shallowRef({
    width: '',
    top: '',
    left: ''
  })
  const position = shallowRef('bottom')
  const calcDropdownStyle = () => {
    const rect = treeSelectRef?.value?.getBoundingClientRect()

    if (rect) {
      let top = rect.bottom + 16 + 'px'
      position.value = 'bottom'
      let dropdownHeight = props.multiple ? 232 : 200
      if (rect.bottom + 16 + dropdownHeight > window.innerHeight) {
        top = rect.top - 16 - dropdownHeight + 'px'
        position.value = 'top'
      }
      dropdownStyle.value = {
        width: rect.width + 'px',
        top,
        left: rect.left + 'px'
      }
    }
  }

  const showTree = () => {
    hasRendered.value = true
    treeVisible.value = true
    calcDropdownStyle()
  }

  const hideTree = () => {
    treeVisible.value = false
  }

  // 值相关操作---------------------------------------

  /** 多选值的tag, 如果子节点全部被选中， 那么tag只现实父节点一个 */
  const tagList = shallowRef<Record<string, any>[]>([])

  /** 单选值 */
  const selectedLabel = shallowRef<string | number>('')

  /** 关闭标签 */
  const handleCloseTag = (data: Record<string, any>, i: number) => {
    const tree = treeRef.value
    const { modelValue, labelKey, valueKey } = props
    if (!tree || !Array.isArray(modelValue)) return

    tagList.value.splice(i, 1)
    tree.setChecked(data[valueKey], false)

    const { nodes, keys } = tree.getChecked()
    const labels = nodes.map(node => node[labelKey])
    emitModelValue(keys, labels, nodes)
  }

  /** 设置树的选中状态 */
  const setTreeChecked = () => {
    const tree = treeRef.value
    if (!tree) return

    const { modelValue, multiple, labelKey } = props

    if (Array.isArray(modelValue)) {
      if (!multiple) return
      tree.setCheckedKeys(modelValue)
      tagList.value = tree.getChecked().nodes
    } else {
      if (!modelValue && modelValue !== 0) {
        return (selectedLabel.value = '')
      }
      tree.setCurrentKey(modelValue)
      selectedLabel.value = tree.getCurrentNode()?.[labelKey] ?? ''
    }
  }

  /** 单选 */
  const handleSelectChange = (data?: TreeNodeData) => {
    const { labelKey, valueKey, multiple } = props
    if (multiple) return
    const value = data?.[valueKey]
    const label = data?.[labelKey]
    selectedLabel.value = label
    changedByEvent.value = true
    emitModelValue(value, label, data)
    hideTree()
  }

  /** 多选 */
  const handleCheck = (_, info: CheckedInfo) => {
    const { checkedKeys, checkedNodes } = info
    const { labelKey } = props
    const checkedLabels = checkedNodes.map(node => node[labelKey])
    tagList.value = checkedNodes
    changedByEvent.value = true
    emitModelValue(checkedKeys, checkedLabels, checkedNodes)
    nextTick(() => {
      calcDropdownStyle()
    })
  }

  /** 过滤方法 */
  const filterMethod = (query: string, node: TreeNodeData) => {
    const { labelKey } = props
    if (!query) return true
    return node[labelKey].includes(query)
  }

  return {
    treeRef,
    treeSelectRef,
    dropdownRef,
    treeVisible,
    changedByEvent,
    clearable,
    position,
    handleMouseLeave,
    handleMouseEnter,
    hasRendered,
    emitModelValue,
    tagList,
    selectedLabel,
    setTreeChecked,
    handleCheck,
    filterMethod,
    handleSelectChange,
    showTree,
    hideTree,
    dropdownStyle,
    handleCloseTag
  }
}
