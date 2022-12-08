import { reactive, shallowReactive } from 'vue'
import type { MultipleFormRow } from './type'

/**
 * 创建行
 * @param parent 父级
 * @param data 数据
 * @param index 索引
 * @param status 状态
 * @param children 子元素
 */
export function createRow(
  parent: MultipleFormRow | null,
  data: Record<string, any>,
  index: number,
  status: MultipleFormRow['status'],
  children?: MultipleFormRow[]
): MultipleFormRow {
  // 如果parent为空(根row)或者parent为rootRow则depth都视为1
  const isRoot = !parent?.parent

  const row = shallowReactive<MultipleFormRow>({
    data: reactive(data),
    index,
    indexes: (parent && !isRoot) ? [...parent.indexes, index] : [index],
    parent,
    status,
    // row初始创建时如果status为editing则视该条数据为未保存状态
    saved: status === 'editing' ? false : true,
    depth: isRoot ? 0 : parent.depth + 1
  })

  if (children) {
    row.children = children
  }

  return row
}

export function wrapDataRows(data: any[], parent: MultipleFormRow) {
  return data.map((item, index) => {
    const row = createRow(parent, item, index, 'view')

    if (item.children) {
      row.children = wrapDataRows(item.children, row)
    }
    return row
  })
}

export function unwrapRows(rows: MultipleFormRow[]) {
  return rows.map(row => {
    const { data } = row
    if (row.children) {
      data.children = unwrapRows(row.children)
    }
    return data
  })
}

/**
 * 扁平tree
 * @param arr tree数组
 * @param acc 初始累加值
 */
export function flatTree<T extends Record<string, any>>(
  arr: T[],
  acc: T[] = []
) {
  arr.forEach(item => {
    acc.push(item)
    if (item.children) {
      flatTree(item.children, acc)
    }
  })

  return acc
}
