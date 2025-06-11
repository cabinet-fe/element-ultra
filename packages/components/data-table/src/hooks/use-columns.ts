import ElCheckbox from '@element-ultra/components/checkbox'
import ElIcon from '@element-ultra/components/icon'
import { computed, h, useSlots } from 'vue'
import type {
  DataTableColumn,
  DataTableEmits,
  DataTableProps,
  DataTreeRow
} from '../data-table'
import { bfs, InternalColumn, FixedColumn, StaticColumn } from '../utils'
import type { UseStateReturned } from './use-state'
import { Plus, Minus, Loading } from 'icon-ultra'

// 固定列: 只有最父级可以进行左右定位的配置
// 列位置调换: 只有父级可以进行位置调换
// 列宽调整: 只有叶子节点的表头可以调整列宽
// 在列调整时需要触发对应的事件

type Looper = <T>(
  arr: T[],
  cb: (cur: T, pre: T | undefined, next: T | undefined) => void
) => void

/** 循环 */
const loop: Looper = (arr, cb) => {
  let i = -1
  while (++i < arr.length) {
    cb(arr[i], arr[i - 1], arr[i + 1])
  }
}

/** 从右侧开始循环 */
const loopRight: Looper = (arr, cb) => {
  let i = arr.length
  while (i-- > 0) {
    cb(arr[i], arr[i - 1], arr[i + 1])
  }
}

/**
 * 转化列为组件所需的数据结构
 * @param props 表格属性
 */
export default function useColumns(
  props: DataTableProps,
  emit: DataTableEmits,
  state: UseStateReturned
) {
  const {
    allChecked,
    someChecked,
    checkAll,
    clearChecked,
    toggleItemCheck,
    toggleSelect,
    store,
    getFlatData,
    childrenKey,
    dfsReactive
  } = state

  /** 获取列 */
  const getColumns = () => {
    return props.columns
  }

  /** 额外列(序号, 单选/多选, 展开栏) */
  const preColumns = computed(() => {
    const { checkable, selectable, showIndex, tree, lazyLoad } = props

    let result: InternalColumn[] = []

    if (tree) {
      result.push({
        name: '',
        key: '$_expand',
        width: 100,
        fixed: 'left',
        render: ctx => {
          const wrap = ctx.wrap as DataTreeRow

          const style = {
            marginLeft: wrap.depth * 20 + 'px'
          }

          // 加载状态
          if (wrap.loading) {
            return h(ElIcon, { class: 'is-loading', style }, () => h(Loading))
          }

          if (wrap.children?.length || (lazyLoad && !wrap.loaded)) {
            return h(
              ElIcon,
              {
                class: 'el-data-table__expand-icon',
                style,
                async onClick() {
                  wrap.expanded = !wrap.expanded
                  emit('row-expand', wrap.data, wrap)
                  if (lazyLoad && !wrap.loaded) {
                    wrap.loading = true
                    const loadedData = await lazyLoad(wrap.data, wrap)
                    if (loadedData) {
                      wrap.data[childrenKey.value] = loadedData
                      wrap.children = dfsReactive(loadedData, wrap.depth + 1)
                    }
                    wrap.loaded = true
                    wrap.loading = false
                  }
                  getFlatData()
                }
              },
              () => (wrap.expanded ? h(Minus) : h(Plus))
            )
          }

          return h('span', {
            class: 'el-data-table__leaf-icon',
            style
          })
        }
      })
    }

    // 多选和单选只能有一个, 且多选优先级更高
    if (checkable !== false) {
      // 高性能写法
      const render: InternalColumn['render'] =
        checkable === true
          ? ({ wrap, row }) =>
              h(ElCheckbox, {
                modelValue: store.checked.has(row),
                'onUpdate:modelValue': v => {
                  toggleItemCheck(wrap, v as boolean)
                }
              })
          : ({ row, index, wrap }) =>
              h(ElCheckbox, {
                disabled: !checkable(row, index),
                modelValue: store.checked.has(row),
                'onUpdate:modelValue': v => {
                  toggleItemCheck(wrap, v as boolean)
                }
              })
      result.push({
        name: () =>
          h(ElCheckbox, {
            modelValue: allChecked.value,
            indeterminate: someChecked.value,
            'onUpdate:modelValue': v => {
              v ? checkAll() : clearChecked()
            }
          }),
        key: '$_checkbox',
        width: 60,
        fixed: 'left',
        align: 'center',
        render
      })
    } else if (selectable !== false) {
      const render: InternalColumn['render'] =
        selectable === true
          ? ({ row }) =>
              h(ElCheckbox, {
                modelValue: store.selected === row,
                'onUpdate:modelValue': v => {
                  v ? toggleSelect(row) : toggleSelect(false)
                }
              })
          : ({ row, index }) =>
              h(ElCheckbox, {
                disabled: !selectable(row, index),
                modelValue: store.selected === row,
                'onUpdate:modelValue': v => {
                  v ? toggleSelect(row) : toggleSelect(false)
                }
              })

      result.push({
        name: () => '单选',
        key: '$_radio',
        width: 60,
        align: 'center',
        fixed: 'left',
        render
      })
    }

    if (showIndex !== false) {
      result.push({
        name: () => '序号',
        key: '$_index',
        width: 60,
        fixed: 'left',
        align: 'center',
        render: ({ index }) => index + 1
      })
    }

    return result
  })

  // 先对一级列进行分组排序
  /** 排序并将列设为响应式 */
  const sortedColumns = computed(() => {
    /** 固定在左侧的列 */
    const leftColumns: DataTableColumn[] = []
    /** 在中间的列 */
    const centerColumns: DataTableColumn[] = []
    /** 固定在右侧的ie */
    const rightColumns: DataTableColumn[] = []

    preColumns.value.concat(props.columns).forEach(column => {
      // 设置了宽度的列才会有效地固定
      if (column.width && !column.children) {
        if (column.fixed === 'left') {
          return leftColumns.push(column)
        }
        if (column.fixed === 'right') {
          return rightColumns.push(column)
        }
      }

      centerColumns.push(column)
    })
    return leftColumns.concat(centerColumns).concat(rightColumns)
  })

  /** 多级表头的二维结构 */

  const headerRows = computed(() => bfs(sortedColumns.value))

  const slots = useSlots()

  // 深度优先遍历获取列的叶子节点
  // 叶子节点用于表体
  const leafColumns = computed(() => {
    const result = {
      left: [] as FixedColumn[],
      center: [] as StaticColumn[],
      right: [] as FixedColumn[]
    }

    let startIndex = 0

    ~(function recursive(columns: DataTableColumn[], root?: DataTableColumn) {
      // 分组列不能够固定, 因此将fixed设置为空
      columns.forEach(column => {
        // 存在嵌套的列不作固定, 删除固定属性
        if (root || column.children?.length) {
          delete column.fixed
        }

        if (column.visible === false) {
          return
        }

        if (column.children?.length) {
          return recursive(
            column.children,
            !root ? (column as DataTableColumn) : root
          )
        }

        // 处理叶子节点
        // 将插槽或者row[key]转化为渲染函数, 避免在数据循环中判断, 在有大量数据时开销很大
        if (!column.render) {
          if (column.slot) {
            column.render = ctx => {
              return slots[column.slot!]?.(ctx)
            }
          } else {
            column.render = ({ val }) =>
              val instanceof Object ? String(val) : val
          }
        }

        // 固定列必须加宽高才能ok
        if (column.width) {
          // 移动至对应的
          if (column.fixed === 'left') {
            return result.left.push(column as FixedColumn)
          }
          if (column.fixed === 'right') {
            return result.right.push(column as FixedColumn)
          }
        }

        return result.center.push(column as StaticColumn)
      })
    })(sortedColumns.value)

    // TODO寻找更加优雅的解决方案
    // 给叶子节点编号, 以便于在表头中拖拽列宽
    Object.keys(result).forEach(key => {
      result[key as keyof typeof result].forEach(
        column => (column.index = startIndex++)
      )
    })
    computePosition(result)
    return result
  })

  type LeafColumns = typeof leafColumns.value

  const computePosition = (columns?: LeafColumns) => {
    if (!columns) {
      columns = leafColumns.value
    }

    columns.center.forEach(column => {
      delete column.left
      delete column.right
    })

    loop(columns.left, (cur, pre) => {
      delete cur.right
      if (pre) {
        cur.left = pre.left! + pre.width
      } else {
        cur.left = 0
      }
    })

    loopRight(columns.right, (cur, _, next) => {
      delete cur.left
      if (next) {
        cur.right = next.right! + next.width
      } else {
        cur.right = 0
      }
    })
  }

  return {
    /** 多级表头的二维结构 */
    headerRows,

    /** 叶子列 */
    leafColumns,

    /** 计算列的定位 */
    computePosition,

    /** 获取列 */
    getColumns
  }
}

export type UseColumnsReturned = ReturnType<typeof useColumns>
