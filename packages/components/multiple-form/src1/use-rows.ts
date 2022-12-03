import { nextTick, reactive, shallowReactive, shallowRef, watch } from "vue"
import type { MultipleFormEmits, MultipleFormProps, MultipleFormRow } from "./multiple-form"
import { wrapDataRows, unwrapRows } from './utils'

// TODO 让性能优化更好, 分情况只触发每次更改的部分
interface Options {
  props: MultipleFormProps,
  emit: MultipleFormEmits
}

export default function useRows(options: Options) {
  const { props, emit } = options

  const rows = shallowRef<MultipleFormRow[]>([])

  const emitChange = () => {
    const data = unwrapRows(rows.value)
    emit('change', data)
    emit('update:data', data)
  }

  // 一旦是用户操作发起的数据的改变, 则不重新wrapRows从而提高性能
  let editByUser = false
  // 标记为用户操作
  const markAsUserAction = <Args extends any[]>(action: (...args: Args) => void) => {
    return (...args: Args) => {
      editByUser = true
      action(...args)
      nextTick(() => {
        editByUser = false
      })
    }
  }

  // 不能每次data更新时都重新包裹row
  // 一旦editedRowsMap不为空则返回
  watch(() => props.data, data => {
    if (!data || editByUser) return
    rows.value = wrapDataRows(data)
  })

  /**
   * 新增行
   * @param parent 父级
   */
  const handleCreateRow = markAsUserAction((parent?: MultipleFormRow) => {
    if (parent) {
      const { children } = parent
      children?.length && children.push(shallowReactive({
        data: reactive({}),
        index: children.length,
        indexes: [...parent.indexes, children.length],
        status: 'editing',
        parent
      }))
    } else {
      rows.value = [...rows.value, shallowReactive({
        data: reactive({}),
        index: rows.value.length,
        indexes: [rows.value.length],
        status: 'editing',
        parent: null
      })]
    }


    emitChange()
  })

  /**
   * 删除行
   * @param row 行
   */
  const handleDeleteRow = markAsUserAction((row: MultipleFormRow) => {
    const target = row.indexes.slice(0, -1).reduce((acc, cur) => {
      acc = acc[cur].children!
      return acc
    }, rows.value)

    target.splice(row.indexes[row.indexes.length - 1], 1)

    emitChange()
  })

  return {
    rows,
    /** 触发改变事件 */
    emitChange,
    /** 删除行 */
    handleDeleteRow,
    /** 新增行 */
    handleCreateRow
  }
}