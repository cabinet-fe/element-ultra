import { defineComponent, inject, PropType } from 'vue'
import { dataFooterToken, dataTableToken } from './token'
import type { FixedColumn, StaticColumn } from './utils'

function defineCellProps<Column = FixedColumn>() {
  return {
    column: {
      type: Object as PropType<Column>,
      required: true
    }
  } as const
}

export const LeftCell = defineComponent({
  name: 'LeftCell',

  props: defineCellProps(),

  setup(props) {
    const { cellClass, leftCellClass } = inject(dataFooterToken)!
    const { rootProps } = inject(dataTableToken)!
    return () => {
      const { column } = props

      return (
        <td
          class={[cellClass, leftCellClass]}
          style={{
            left: column.left + 'px',
            'text-align': column.align
          }}
        >
          {rootProps.data.reduce((acc, cur) => {
            return acc + +cur[column.key]
          }, 0)}
        </td>
      )
    }
  }
})

export const CenterCell = defineComponent({
  name: 'CenterCell',

  props: defineCellProps<StaticColumn>(),

  setup(props) {
    const { cellClass, centerCellClass } = inject(dataFooterToken)!
    const { rootProps } = inject(dataTableToken)!
    return () => {
      const { column } = props
      return (
        <td
          class={[cellClass, centerCellClass]}
          style={{ 'text-align': column.align }}
        >
          {rootProps.data.reduce((acc, cur) => {
            return acc + +cur[column.key]
          }, 0)}
        </td>
      )
    }
  }
})

export const RightCell = defineComponent({
  name: 'RightCell',

  props: defineCellProps(),

  setup(props) {
    const { cellClass, rightCellClass } = inject(dataFooterToken)!
    const { rootProps } = inject(dataTableToken)!
    return () => {
      const { column } = props
      return (
        <td
          class={[cellClass, rightCellClass]}
          style={{
            right: column.right + 'px',
            'text-align': column.align
          }}
        >
          {rootProps.data.reduce((acc, cur) => {
            return acc + +cur[column.key]
          }, 0)}
        </td>
      )
    }
  }
})
