import { getChainValue } from '@element-ultra/utils'
import { CSSProperties, defineComponent, inject, PropType } from 'vue'
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

      rowScoped: {
        type: Object as PropType<{
          index: number
          item: any
          style: CSSProperties
        }>,
        required: true
      }
    },
    setup(props) {
      const classes = getClassName()

      return () => {
        const { rowScoped } = props
        const { index, style, item } = rowScoped
        let column = props.column as FixedColumn

        const content = column.render!(
          getChainValue(item, column.key),
          item,
          index
        )

        return (
          <td
            class={classes}
            style={{
              ...styleGetter(column),
              'text-align': column.align,
              ...style
            }}
          >
            <div>
            {content}
            </div>
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
