import { getChainValue } from '@element-ultra/utils'
import { defineComponent, inject, PropType } from 'vue'
import type { DataTableRow, DataTreeRow } from './data-table'
import { dataBodyToken } from './token'
import type { FixedColumn, StaticColumn } from './utils'
import { dataTableToken } from './token'

const buildCell = <
  Name extends 'LeftCell' | 'CenterCell' | 'RightCell',
  Column = Name extends 'CenterCell' ? StaticColumn : FixedColumn
>(
  name: Name
) => {
  const getClassName = {
    LeftCell(extra: string[] = []) {
      const { cellClass, leftCellClass } = inject(dataBodyToken)!
      return [cellClass, leftCellClass, ...extra]
    },
    CenterCell(extra: string[] = []) {
      const { cellClass, centerCellClass } = inject(dataBodyToken)!
      return [cellClass, centerCellClass, ...extra]
    },
    RightCell(extra: string[] = []) {
      const { cellClass, rightCellClass } = inject(dataBodyToken)!
      return [cellClass, rightCellClass, ...extra]
    }
  }[name]

  const styleGetters = {
    LeftCell(column: FixedColumn) {
      return {
        left: column.left + 'px'
      }
    },
    CenterCell(column: StaticColumn) {
      return {}
    },
    RightCell(column: FixedColumn) {
      return {
        right: column.right + 'px'
      }
    }
  }
  const styleGetter = styleGetters[name]

  return defineComponent({
    name,
    props: {
      column: {
        type: Object as PropType<Column>,
        required: true
      },

      columnIndex: {
        type: Number,
        required: true
      },

      row: {
        type: Object as PropType<DataTableRow | DataTreeRow>,
        required: true
      }
    },
    setup(props) {
      const { rootProps } = inject(dataTableToken)!

      const { row, columnIndex } = props
      const { index, data } = row
      const column = props.column as FixedColumn
      const classes = getClassName(
        rootProps.cellClass?.(row, column, columnIndex)
      )
      let val = getChainValue(data, column.key)

      const cellConfig = rootProps.mergeCell?.(row, column, columnIndex)
      const showCell = !cellConfig || (cellConfig.colspan && cellConfig.rowspan)

      return () => {
        const content = column.render!({
          val,
          v: val,
          wrap: row,
          row: data,
          index
        })
        return showCell ? (
          <td
            class={classes}
            title={val}
            rowspan={cellConfig?.rowspan}
            colspan={cellConfig?.colspan}
            style={{
              ...styleGetter(column),
              'text-align': column.align
            }}
          >
            <div>{content}</div>
          </td>
        ) : null
      }
    }
  })
}

/** 左栏 */
export const LeftCell = buildCell('LeftCell')

/** 中栏 */
export const CenterCell = buildCell('CenterCell')

/** 右栏 */
export const RightCell = buildCell('RightCell')
