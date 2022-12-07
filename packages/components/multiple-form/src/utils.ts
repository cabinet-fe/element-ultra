import { reactive } from 'vue'
import type { MultipleFormRow } from './multiple-form'

export function wrapDataRows(
  data: any[],
  parent: MultipleFormRow | null = null
) {
  return data.map((item, index) => {
    const row: MultipleFormRow = {
      data: reactive(item),
      status: 'view',
      parent,
      index,
      indexes: parent ? parent.indexes.concat(index) : [index]
    }

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
export function flatTree<T extends Record<string, any>>(arr: T[], acc: T[] = []) {
  arr.forEach(item => {
    acc.push(item)
    if (item.children) {
      flatTree(item.children, acc)
    }
  })

  return acc
}