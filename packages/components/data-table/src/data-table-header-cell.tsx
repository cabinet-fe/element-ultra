import { defineComponent, inject, PropType } from 'vue'
import { dataHeaderToken, dataTableToken } from './token'
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
    'text-align': column.align || 'left',
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

      rowIndex: {
        type: Number,
        required: true
      }
    },

    setup(props) {
      const { getCellRowSpan, resizeClass, handleResizeMousedown } =
        inject(dataHeaderToken)!
      const commonClassName = getClassName()
      const { handleSort, store, ns } = inject(dataTableToken)!

      return () => {
        const { header, rowIndex } = props
        const { data } = header
        let className = [...commonClassName]
        header.isLeaf && className.push('is-leaf')

        const resizer = header.isLeaf ? (
          <span
            class={resizeClass}
            style='right: 0'
            onMousedown={event => handleResizeMousedown(event, header)}
          ></span>
        ) : null

        const sorter =
          header.isLeaf && data.sortable ? (
            <span
              class={ns.e('sort-trigger')}
              onClick={() => handleSort(data.key)}
            >
              <i
                class={{
                  asc: true,
                  'is-active': store.sortKeys[data.key] === 'asc'
                }}
              ></i>
              <i
                class={{
                  dsc: true,
                  'is-active': store.sortKeys[data.key] === 'dsc'
                }}
              ></i>
            </span>
          ) : null

        return (
          <th
            rowspan={getCellRowSpan(header, rowIndex)}
            colspan={header.size || undefined}
            key={data.key}
            class={className}
            style={getHeaderStyle(data)}
          >
            {resizer}
            <div>
              {typeof data.name === 'function' ? data.name() : data.name}
              {sorter}
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
  left(header: TableHeader, rowIndex: number) {
    return <LeftCell header={header} rowIndex={rowIndex} />
  },
  center(header: TableHeader, rowIndex: number) {
    return <CenterCell header={header} rowIndex={rowIndex} />
  },
  right(header: TableHeader, rowIndex: number) {
    return <RightCell header={header} rowIndex={rowIndex} />
  }
}

export default function renderHeaderCell(
  header: TableHeader,
  rowIndex: number
) {
  return renderers[header.data.fixed || 'center'](header, rowIndex)
}
