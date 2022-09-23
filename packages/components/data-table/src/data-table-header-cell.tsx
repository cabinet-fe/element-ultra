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
      const {
        getCellRowSpan,
        resizeClass,
        handleResizeMousedown,
        adjusterRef
      } = inject(dataHeaderToken)!
      const commonClassName = getClassName()
      const { handleSort, store, ns } = inject(dataTableToken)!

      return () => {
        const { header, rowIndex } = props
        const { data } = header
        let className = [...commonClassName]
        header.isLeaf && className.push('is-leaf')

        /** 尺寸调节器 */
        const resizer =
          header.isLeaf && !header.isPre ? (
            <span
              class={resizeClass}
              style='right: 0'
              onMousedown={event => {
                handleResizeMousedown(event, header)
              }}
            ></span>
          ) : null

        /** 排序器 */
        const sorter =
          header.isLeaf && data.sortable ? (
            <span
              class={ns.e('sort-trigger')}
              onClick={e => handleSort(data.key)}
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

        /** 表头展示内容 */
        let content = typeof data.name === 'function' ? data.name() : data.name

        if (!header.isPre) {
          // span用来减少触发范围
          content = (
            <span
              onClick={e =>
                adjusterRef.value?.open(e.target as HTMLTableCellElement, data)
              }
              style='cursor: default'
            >
              {content}
            </span>
          )
        }

        return (
          <th
            rowspan={getCellRowSpan(header, rowIndex)}
            colspan={header.size || undefined}
            key={data.key}
            class={className}
            style={getHeaderStyle(data)}
          >
            {resizer}
            {/*
              因为th需要用shadow来定位而到外部作固定列的阴影效果
              所以包裹一个div来做省略号功能
            */}
            <div>
              {content}
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
