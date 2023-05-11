import { getChainValue } from 'utils'
import { defineComponent, inject, PropType } from 'vue'
import type { Row, DataTreeRow } from './data-table'
import { dataBodyToken } from './token'
import type { FixedColumn, StaticColumn } from './utils'

const buildCell = <
  Name extends 'LeftCell' | 'CenterCell' | 'RightCell',
  Column = Name extends 'CenterCell' ? StaticColumn : FixedColumn
>(
  name: Name
) => {
  const getClassName = {
    LeftCell() {
      const { cellClass, leftCellClass } = inject(dataBodyToken)!
      return [cellClass, leftCellClass]
    },
    CenterCell() {
      const { cellClass, centerCellClass } = inject(dataBodyToken)!
      return [cellClass, centerCellClass]
    },
    RightCell() {
      const { cellClass, rightCellClass } = inject(dataBodyToken)!
      return [cellClass, rightCellClass]
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

      row: {
        type: Object as PropType<Row | DataTreeRow>,
        required: true
      }
    },
    setup(props) {
      const classes = getClassName()

      return () => {
        const { row } = props
        const { index, data } = row

        const column = props.column as FixedColumn

        let val = getChainValue(data, column.key)
        const content = column.render!({
          val,
          v: val,
          wrap: row,
          row: data,
          index
        })

        return (
          <td
            class={classes}
            title={val}
            style={{
              ...styleGetter(column),
              'text-align': column.align
            }}
          >
            <div>{content}</div>
          </td>
        )
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
