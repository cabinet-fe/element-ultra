import {
  shallowRef,
  watch,
  nextTick,
  computed,
  type ShallowRef,
  ComputedRef
} from 'vue'
import type {
  CheckedInfo,
  TreeNodeData,
  ElTree
} from '@element-ultra/components/tree'
import type { TreeSelectProps, TreeSelectEmits } from './tree-select'
import { useFormItem } from '@element-ultra/hooks'
import { getChainValue } from '@element-ultra/utils'

interface Options {
  props: TreeSelectProps
  emit: TreeSelectEmits
  treeRef: ShallowRef<InstanceType<typeof ElTree> | undefined>
  filterer: any
  treeSelectDisabled: ComputedRef<boolean>
}

export default function useTreeSelect(options: Options) {
  const { props, emit, treeRef, filterer, treeSelectDisabled } = options

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

  // 只有不是通过用户事件触发的才调用
  watch(
    [() => props.modelValue, () => props.data],
    () => {
      if (changedByEvent.value) {
        changedByEvent.value = false
        return
      }

      nextTick(() => setTreeChecked())
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
    emit('update:text', label)
    formItem?.validate()
  }

  /** 计算dropdown的位置 */
  const treeSelectRef = shallowRef<HTMLDivElement>()

  const position = shallowRef('bottom')

  const openDialog = () => {
    if (treeSelectDisabled.value) return
    treeVisible.value = true
  }
  const closeDialog = () => {
    treeVisible.value = false
  }

  watch(treeVisible, visible => {
    if (!visible) {
      filterer.query = ''
      treeRef.value?.filter('')
    }
  })

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
    tree.setChecked(getChainValue(data, valueKey), false)

    const { nodes, keys } = tree.getChecked()

    const labels = nodes.map(node => getChainValue(node, labelKey))
    emitModelValue(keys, labels, nodes)
  }

  /** 设置树的选中状态 */
  const setTreeChecked = () => {
    const tree = treeRef.value
    if (!tree) return

    const { modelValue, multiple, labelKey, text } = props

    // 多选选中
    if (Array.isArray(modelValue)) {
      if (!multiple) return
      tree.setCheckedKeys(modelValue)
      tagList.value = tree.getChecked().nodes
    }
    // 单选
    else {
      if (!modelValue && modelValue !== 0) {
        tree?.setCurrentKey('')
        selectedLabel.value = ''
        return
      }

      tree.setCurrentKey(modelValue)
      selectedLabel.value =
        getChainValue(tree.getCurrentNode(), labelKey) ?? text
    }
  }

  /** 单选 */
  const handleSelectChange = (data?: TreeNodeData) => {
    const { labelKey, valueKey, multiple } = props
    if (multiple) return
    const value = getChainValue(data, valueKey)
    const label = getChainValue(data, labelKey)
    selectedLabel.value = label
    changedByEvent.value = true
    emitModelValue(value, label, data)
    closeDialog()
  }

  /** 多选 */
  const handleCheck = (_: any, info: CheckedInfo) => {
    const { checkedKeys, checkedNodes } = info
    const { labelKey } = props
    const checkedLabels = checkedNodes.map(node =>
      getChainValue(node, labelKey)
    )
    tagList.value = checkedNodes
    changedByEvent.value = true
    emitModelValue(checkedKeys, checkedLabels, checkedNodes)
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
    handleSelectChange,
    openDialog,
    closeDialog,
    handleCloseTag
  }
}
