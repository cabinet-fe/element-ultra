import { defineComponent, inject, PropType } from 'vue'
import { dataFooterToken, dataTableToken } from './token'
import type { FixedColumn, StaticColumn } from './utils'

const buildCell = <
  Name extends 'LeftCell' | 'CenterCell' | 'RightCell',
  Column = Name extends 'CenterCell' ? StaticColumn : FixedColumn
>(
  name: Name
) => {
  const useClassName = {
    LeftCell() {
      const { cellClass, leftCellClass } = inject(dataFooterToken)!
      return [cellClass, leftCellClass]
    },
    CenterCell() {
      const { cellClass, centerCellClass } = inject(dataFooterToken)!
      return [cellClass, centerCellClass]
    },
    RightCell() {
      const { cellClass, rightCellClass } = inject(dataFooterToken)!
      return [cellClass, rightCellClass]
    }
  }[name]

  const getStyle = {
    LeftCell: (column: FixedColumn) => ({ left: column.left + 'px' }),
    CenterCell: (column: StaticColumn) => ({}),
    RightCell: (column: FixedColumn) => ({ right: column.right + 'px' })
  }[name]

  return defineComponent({
    name,

    props: {
      column: {
        type: Object as PropType<Column>,
        required: true
      }
    },

    setup(props) {
      const className = useClassName()
      const { rootProps, itemSize } = inject(dataTableToken)!

      return () => {
        let column = props.column as FixedColumn
        return (
          <td
            class={className}
            style={{
              ...getStyle(column),
              'text-align': column.align,
              height: itemSize.value + 'px'
            }}
          >
            <div>
              {rootProps.data.reduce((acc, cur) => {
                return acc + +cur[column.key]
              }, 0)}
            </div>
          </td>
        )
      }
    }
  })
}

export const LeftCell = buildCell('LeftCell')

export const CenterCell = buildCell('CenterCell')

export const RightCell = buildCell('RightCell')
