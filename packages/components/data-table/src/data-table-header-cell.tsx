import { defineComponent, inject, PropType } from 'vue'

import { dataHeaderToken } from './token'
import type { InternalColumn, TableHeader } from './utils'

const classNameHooksMap = {
  LeftCell() {
    const { cellClass, leftCellClass } = inject(dataHeaderToken)!
    return [cellClass, leftCellClass]
  },
  CenterCell() {
    const { cellClass, centerCellClass } = inject(dataHeaderToken)!
    return [cellClass, centerCellClass]
  },
  RightCell() {
    const { cellClass, rightCellClass } = inject(dataHeaderToken)!
    return [cellClass, rightCellClass]
  }
}

const getHeaderStyle = (column: InternalColumn) => {
  return {
    'text-align': column.align,
    left: column.left + 'px',
    right: column.right + 'px'
  }
}

const buildCell = (name: 'LeftCell' | 'CenterCell' | 'RightCell') => {
  const getClassName = classNameHooksMap[name]

  return defineComponent({
    name,

    props: {
      header: {
        type: Object as PropType<TableHeader>,
        required: true
      },

      row: {
        type: Object,
        required: true
      },

      rowIndex: {
        type: Number,
        required: true
      }
    },

    setup(props) {
      const { getCellRowSpan, resizeClass, handleResizeMousedown } =
        inject(dataHeaderToken)!
      const commonClassName = getClassName()

      return () => {
        const { header, rowIndex } = props
        const { data } = header
        let className = [...commonClassName]
        const resizer = header.isLeaf ? (
          <span
            class={resizeClass}
            style='right: 0'
            onMousedown={event => handleResizeMousedown(event, header)}
          ></span>
        ) : null

        return (
          <th
            rowspan={getCellRowSpan(header, rowIndex)}
            colspan={header.size || undefined}
            key={data.key}
            class={className}
            style={getHeaderStyle(data)}
          >
            <div>
              {resizer}
              {typeof data.name === 'function' ? data.name() : data.name}
            </div>
          </th>
        )
      }
    }
  })
}

const LeftCell = buildCell('LeftCell')
const CenterCell = buildCell('CenterCell')
const RightCell = buildCell('RightCell')

const renderers = {
  left(header: TableHeader, row: any, rowIndex: number) {
    return <LeftCell header={header} row={row} rowIndex={rowIndex} />
  },
  center(header: TableHeader, row: any, rowIndex: number) {
    return <CenterCell header={header} row={row} rowIndex={rowIndex} />
  },
  right(header: TableHeader, row: any, rowIndex: number) {
    return <RightCell header={header} row={row} rowIndex={rowIndex} />
  }
}

export default function renderHeaderCell(
  header: TableHeader,
  row: any,
  rowIndex: number
) {
  return renderers[header.data.fixed || 'center'](header, row, rowIndex)
}
