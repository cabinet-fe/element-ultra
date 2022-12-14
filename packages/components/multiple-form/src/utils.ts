import { reactive, shallowReactive } from 'vue'
import type { MultipleFormRow } from './type'

interface RootRowConf {
  root: true
}

interface RowConf {
  parent: MultipleFormRow
  data: Record<string, any>
  index: number
  status: MultipleFormRow['status']
  children?: MultipleFormRow[]
}

const isRoot = (v: any): v is RootRowConf => v.root === true

/**
 * 创建行
 * @param rowConf 行配置
 */
export function createRow(rowConf: RowConf | RootRowConf): MultipleFormRow {
  let row: MultipleFormRow
  if (isRoot(rowConf)) {
    row = shallowReactive<MultipleFormRow>({
      root: true,
      data: null,
      index: -1,
      indexes: [],
      parent: null,
      status: 'view',
      // row初始创建时如果status为editing则视该条数据为未保存状态
      saved: true,
      // 根row和根的直接子row的深度都视为0
      depth: 0,
      children: [],
      loading: false
    })
  } else {
    const { parent, index, status, children, data } = rowConf
    row = shallowReactive<MultipleFormRow>({
      root: false,
      data: reactive(data),
      status,
      parent,
      // row初始创建时如果status为editing则视该条数据为未保存状态
      saved: status === 'editing' ? false : true,
      depth: parent.root ? 0 : parent.depth + 1,
      index,
      indexes: parent.indexes.concat(index),
      loading: false
    })
    if (children) {
      row.children = children
    }
  }

  return row
}

export function wrapDataRows(data: any[], parent: MultipleFormRow) {
  return data.map((item, index) => {
    const row = createRow({
      parent,
      data: item,
      index,
      status: 'view'
    })

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