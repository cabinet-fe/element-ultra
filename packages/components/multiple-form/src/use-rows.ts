import { nextTick, reactive, shallowReactive, watch } from 'vue'
import type {
  MultipleFormEmits,
  MultipleFormProps,
  MultipleFormRow
} from './multiple-form'
import { wrapDataRows, unwrapRows } from './utils'

// TODO 让性能优化更好, 分情况只触发每次更改的部分
interface Options {
  props: MultipleFormProps
  emit: MultipleFormEmits
}

/**
 *
 * @param parent
 * @param data
 * @param index
 * @param status
 * @param children
 */
const createRow = (
  parent: MultipleFormRow | null,
  data: Record<string, any>,
  index: number,
  status: MultipleFormRow['status'],
  children?: MultipleFormRow[],
): MultipleFormRow => {
  const row = shallowReactive<MultipleFormRow>({
    data: reactive(data),
    index,
    indexes: parent ? [...parent.indexes, index] : [index],
    parent,
    status
  })

  if (children) {
    row.children = children
  }

  return row
}

export default function useRows(options: Options) {
  const { props, emit } = options

  /** 根行 */
  const root = createRow(null, {}, 0, 'view', [])

  const emitChange = () => {
    const data = unwrapRows(root.children!)
    emit('change', data)
    emit('update:data', data)
  }

  // 一旦是用户操作发起的数据的改变, 则不重新wrapRows从而提高性能
  let editByUser = false
  // 标记为用户操作
  const markAsUserAction = <Args extends any[]>(
    action: (...args: Args) => void
  ) => {
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
  watch(
    () => props.data,
    data => {
      if (!data || editByUser) return
      root.children = wrapDataRows(data, root)
    }
  )

  /**
   * 设置当前新增行的上一行的状态
   * @param rows 所有行数据
   * @param type 设置为何种状态
   */
  const setPreRowStatus = (
    rows: MultipleFormRow[],
    type: MultipleFormRow['status']
  ) => {
    if (!rows.length) return
    rows[rows.length - 1].status = type
  }

  const getIndexes = (indexes: number | number[]) => {
    if (Array.isArray(indexes)) {
      return indexes
    }
    if (typeof indexes === 'number') {
      return [indexes]
    }

    throw new Error('参数indexes类型错误')
  }

  /** 查询数据 */
  const find = (indexes: number | number[]) => {
    const _indexes = getIndexes(indexes)

    // 查找到最后一级的arr
    const target = _indexes.slice(0, -1).reduce((acc, index) => {
      if (index < 0) {
        throw new Error('索引中不能出现小于0的数字')
      }

      const target = acc.children?.[index]

      if (!target) {
        throw new Error(`没有找到该索引 [${_indexes}] 对应的数据`)
      }

      return target
    }, root)

    return target
  }

  const insertTo = markAsUserAction(
    (
      indexes: number | number[],
      rowData: Record<string, any>,
      status: MultipleFormRow['status'],
      replaced = false,
    ) => {
      const _indexes = getIndexes(indexes)

      const parent = find(_indexes.slice(0, -1))

      const { children = [] } = parent
      const lastIndex = _indexes[_indexes.length - 1]

      // 插入索引超出范围则视为错误
      if (lastIndex > children.length) {
        throw new Error('插入的索引超出范围')
      }

      const preHalf = children.slice(0, lastIndex)
      const nextHalf = children.slice(replaced ? lastIndex + 1 : lastIndex)

      parent.children = [
        ...preHalf,
        createRow(null, rowData, lastIndex, status),
        ...nextHalf
      ]

      !replaced &&
        nextHalf.forEach(row => {
          row.index++
          row.indexes[row.indexes.length - 1] = row.index
        })

      emitChange()
    }
  )

  /**
   * 新增行
   * @param parent 父级
   */
  const handleCreateRow = (parent?: MultipleFormRow) => {
    // 在父级下添加子级
    if (parent) {
      const { children } = parent
      children && setPreRowStatus(children, 'view')
      insertTo([...parent.indexes, children?.length ?? 0], {}, 'editing')
    }
    // 在根级添加
    else {
      setPreRowStatus(root.children!, 'view')
      insertTo(root.children!.length, {}, 'editing')
    }
  }

  /** 删除行 */
  const delRow = markAsUserAction((indexes: number | number[]) => {
    const _indexes = getIndexes(indexes)

    const parent = find(_indexes.slice(0, -1))

    const { children } = parent

    if (!children) {
      throw new Error('未找到对应的数据')
    }

    const lastIndex = _indexes[_indexes.length - 1]

    // 插入索引超出范围则视为错误
    if (lastIndex > children.length - 1) {
      throw new Error('所删除的索引超出范围')
    }
    const preHalf = children.slice(0, lastIndex)

    const nextHalf = children.slice(lastIndex + 1)

    parent.children = [...preHalf, ...nextHalf]

    nextHalf.forEach(row => {
      row.index--
      row.indexes[row.indexes.length - 1] = row.index
    })

    emitChange()
  })

  return {
    root,
    /** 触发改变事件 */
    emitChange,
    /** 新增行 */
    handleCreateRow,
    /** 插入行 */
    insertTo,
    /** 查询 */
    find,
    /** 删除行 */
    delRow
  }
}
