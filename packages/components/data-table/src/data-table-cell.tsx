import { getChainValue } from '@element-ultra/utils'
import { CSSProperties, defineComponent, inject, PropType } from 'vue'
import { dataBodyToken } from './token'
import type { FixedColumn, StaticColumn } from './utils'

function defineCellProps<Column = FixedColumn>() {
  return {
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
  } as const
}

export const LeftCell = defineComponent({
  name: 'LeftCell',

  props: defineCellProps(),

  setup(props) {
    const { cellClass, leftCellClass } = inject(dataBodyToken)!

    return () => {
      const { column, rowScoped } = props
      const { index, style, item } = rowScoped

      return (
        <td
          class={[cellClass, leftCellClass]}
          style={{
            left: column.left + 'px',
            'text-align': column.align,
            ...style
          }}
        >
          {column.render!(getChainValue(item, column.key), item, index)}
        </td>
      )
    }
  }
})

export const CenterCell = defineComponent({
  name: 'CenterCell',

  props: defineCellProps<StaticColumn>(),

  setup(props) {
    const { cellClass, centerCellClass } = inject(dataBodyToken)!
    return () => {
      const { column, rowScoped } = props
      const { index, style, item } = rowScoped
      return (
        <td
          class={[cellClass, centerCellClass]}
          style={{ 'text-align': column.align, ...style }}
        >
          {column.render!(getChainValue(item, column.key), item, index)}
        </td>
      )
    }
  }
})

export const RightCell = defineComponent({
  name: 'RightCell',

  props: defineCellProps(),

  setup(props) {
    const { cellClass, rightCellClass } = inject(dataBodyToken)!
    return () => {
      const { column, rowScoped } = props
      const { index, style, item } = rowScoped
      return (
        <td
          class={[cellClass, rightCellClass]}
          style={{
            right: column.right + 'px',
            'text-align': column.align,
            ...style
          }}
        >
          {column.render!(getChainValue(item, column.key), item, index)}
        </td>
      )
    }
  }
})
