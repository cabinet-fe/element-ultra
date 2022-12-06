import { defineComponent, inject, PropType } from 'vue'
import { tableToken } from './token'
import type { TableRow, FinalTableColumn } from './table'
import { getChainValue } from '@element-ultra/utils'

export default defineComponent({
  name: 'TableBodyRow',
  props: {
    row: {
      type: Object as PropType<TableRow>,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { ns, columnLayouts, rootProps, getCellStyle } = inject(tableToken)!
    const rowCellClass = ns.e('row-cell')

    const getNodes = (
      column: FinalTableColumn,
      index: number,
      type: 'left' | 'center' | 'right'
    ) => {
      const { row } = props
      const val = getChainValue(row, column.key)
      const content = column.render!({
        val,
        v: val,
        index,
        row
      })

      return (
        <td
          class={[
            rowCellClass,
            ns.em('row-cell', type),
            ns.is('last', column.typeLast),
            ns.is('first', column.typeFirst)
          ]}
          key={type + '-' + column.key}
          style={getCellStyle(column, column.fixed)}
        >
          {content}
        </td>
      )
    }

    return () => {
      const layouts = columnLayouts.value

      const { rowIndex } = props

      const keys = Object.keys(columnLayouts.value) as [
        'left',
        'center',
        'right'
      ]

      let tds: JSX.Element[] = []

      keys.forEach(key => {
        layouts[key].forEach(column => {
          tds.push(getNodes(column, rowIndex, key))
        })
      })

      return <tr tabindex="0" class={[ns.e('row'), rootProps.rowClass]}>{tds}</tr>
    }
  }
})
