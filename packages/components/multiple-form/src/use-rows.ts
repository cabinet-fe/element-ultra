import type { ElTable } from '@element-ultra/components/table'
import { nextTick, ShallowRef, watch } from 'vue'
import type {
  MultipleFormEmits,
  MultipleFormProps,
  MultipleFormRow
} from './type'
import { wrapDataRows, unwrapRows, createRow } from './utils'
// TODO 让性能优化更好, 分情况只触发每次更改的部分
interface Options {
  props: MultipleFormProps
  emit: MultipleFormEmits
  tableRef: ShallowRef<InstanceType<typeof ElTable> | undefined>
}

export default function useRows(options: Options) {
  const { props, emit } = options

  let originId = 1
  let uid = () => originId++

  /** 根行 */
  const root = createRow({
    root: true
  })

  const emitChange = () => {
    const data = unwrapRows(root.children!, props.childrenKey)
    emit('change', data)
    emit('update:data', data)
  }

  // 一旦是用户操作发起的数据的改变, 则不重新wrapRows从而提高性能
  let editByUser = false
  // 标记为用户操作
  const markAsUserAction = <
    P extends any[],
    R extends any,
    Action extends (...args: P) => R
  >(
    action: Action
  ) => {
    return ((...args: P) => {
      editByUser = true

      let ret = action(...args)

      nextTick(() => {
        editByUser = false
      })

      return ret
    }) as Action
  }

  // 不能每次data更新时都重新包裹row
  // 一旦editedRowsMap不为空则返回
  watch(
    () => props.data,
    data => {
      if (!data || editByUser) return
      root.children = wrapDataRows(data, root, props.childrenKey, uid)
    },
    { immediate: true }
  )

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

    const target = _indexes.reduce((acc, index) => {
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

  /**
   * 插入
   * @param indexes 插入的索引路径
   * @param rowData 行数据
   * @param status 状态插入后显示的状态, view查看, edit编辑
   * @param replaced 是否替换掉原有的数据u
   */
  const rawInsertTo = (
    indexes: number | number[],
    rowData: Record<string, any>,
    status: MultipleFormRow['status'],
    replaced = false
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

    const row = createRow({
      parent,
      uid: uid(),
      data: rowData,
      index: lastIndex,
      status,
      children: replaced ? children[lastIndex].children : undefined
    })

    parent.children = [...preHalf, row, ...nextHalf]

    !replaced &&
      nextHalf.forEach(row => {
        row.index++
        row.indexes[row.indexes.length - 1] = row.index
      })

    emitChange()

    return row
  }
  const insertTo = markAsUserAction(rawInsertTo)

  const update = (indexes: number | number[], rowData: Record<string, any>) => {
    insertTo(indexes, rowData, 'view', true)
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
    /** 插入行 */
    insertTo,
    /** 查询 */
    find,
    /** 删除行 */
    delRow,
    /** 更新行 */
    update
  }
}
