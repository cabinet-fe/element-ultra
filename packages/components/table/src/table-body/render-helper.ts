import { h, computed, inject } from 'vue'
import { getRowIdentity } from '../util'
import { TABLE_INJECTION_KEY } from '../tokens'
import useEvents from './events-helper'
import useStyles from './styles-helper'
import type { TableBodyProps } from './defaults'
import type { RenderRowData, TreeNode, TableProps } from '../table/defaults'

function useRender<T>(props: Partial<TableBodyProps<T>>) {
  const parent = inject(TABLE_INJECTION_KEY)
  const {
    handleDoubleClick,
    handleClick,
    handleContextMenu,
    handleMouseEnter,
    handleMouseLeave,
    handleCellMouseEnter,
    handleCellMouseLeave,
    tooltipContent,
    tooltipTrigger,
  } = useEvents(props)
  const {
    getRowStyle,
    getRowClass,
    getCellStyle,
    getCellClass,
    getSpan,
    getColspanRealWidth,
  } = useStyles(props)
  const firstDefaultColumnIndex = computed(() => {
    return props.store.states.columns.value.findIndex(
      ({ type }) => type === 'default'
    )
  })
  const getKeyOfRow = (row: T, index: number) => {
    const rowKey = (parent.props as Partial<TableProps<T>>).rowKey
    if (rowKey) {
      return getRowIdentity(row, rowKey)
    }
    return index
  }
  const rowRender = (row: T, $index: number, treeRowData?: TreeNode) => {
    const { tooltipEffect, store } = props
    const { indent, columns } = store.states
    const rowClasses = getRowClass(row, $index)
    let display = true
    if (treeRowData) {
      rowClasses.push(`el-table__row--level-${treeRowData.level}`)
      display = treeRowData.display
    }
    const displayStyle = display
      ? null
      : {
          display: 'none',
        }
    return h(
      'tr',
      {
        style: [displayStyle, getRowStyle(row, $index)],
        class: rowClasses,
        key: getKeyOfRow(row, $index),
        onDblclick: ($event) => handleDoubleClick($event, row),
        onClick: ($event) => handleClick($event, row),
        onContextmenu: ($event) => handleContextMenu($event, row),
        onMouseenter: () => handleMouseEnter($index),
        onMouseleave: handleMouseLeave,
      },
      columns.value.map((column, cellIndex) => {

        const { rowspan, colspan } = getSpan(row, column, $index, cellIndex)
        if (!rowspan || !colspan) {
          return null
        }
        const columnData = { ...column }
        columnData.realWidth = getColspanRealWidth(
          columns.value,
          colspan,
          cellIndex
        )
        const data: RenderRowData<T> = {
          store: props.store,
          _self: props.context || parent,
          column: columnData,
          row,
          $index,
        }
        if (cellIndex === firstDefaultColumnIndex.value && treeRowData) {
          data.treeNode = {
            indent: treeRowData.level * indent.value,
            level: treeRowData.level,
          }
          if (typeof treeRowData.expanded === 'boolean') {
            data.treeNode.expanded = treeRowData.expanded
            // ??????????????????
            if ('loading' in treeRowData) {
              data.treeNode.loading = treeRowData.loading
            }
            if ('noLazyChildren' in treeRowData) {
              data.treeNode.noLazyChildren = treeRowData.noLazyChildren
            }
          }
        }
        const baseKey = `${$index},${cellIndex}`
        const patchKey = columnData.columnKey || columnData.rawColumnKey || ''
        const tdChildren = cellChildren(cellIndex, column, data)
        return h(
          'td',
          {
            style: getCellStyle($index, cellIndex, row, column),
            class: getCellClass($index, cellIndex, row, column),
            key: `${patchKey}${baseKey}`,
            // title: column.renderCell(data)
            rowspan,
            colspan,
            onMouseenter: ($event) =>
              handleCellMouseEnter($event, { ...row, tooltipEffect }),
            onMouseleave: handleCellMouseLeave,
          },
          [tdChildren]
        )
      })
    )
  }
  const cellChildren = (cellIndex, column, data) => {
    return column.renderCell(data)
  }
  const wrappedRowRender = (row: T, $index: number) => {
    const store = props.store
    const { isRowExpanded, assertRowKey } = store
    const { treeData, lazyTreeNodeMap, childrenColumnName, rowKey } =
      store.states
    const hasExpandColumn = store.states.columns.value.some(
      ({ type }) => type === 'expand'
    )
    if (hasExpandColumn && isRowExpanded(row)) {
      const renderExpanded = parent.renderExpanded
      const tr = rowRender(row, $index, undefined)
      if (!renderExpanded) {
        console.error('[Element Error]renderExpanded is required.')
        return tr
      }
      // ????????????????????????????????? $index
      // Use a two dimensional array avoid modifying $index
      return [
        [
          tr,
          h(
            'tr',
            {
              key: `expanded-row__${tr.key as string}`,
            },
            [
              h(
                'td',
                {
                  colspan: store.states.columns.value.length,
                  class: 'el-table__cell el-table__expanded-cell',
                },
                [renderExpanded({ row, $index, store })]
              ),
            ]
          ),
        ],
      ]
    } else if (Object.keys(treeData.value).length) {
      assertRowKey()
      // TreeTable ??????rowKey ????????????????????????????????? getKeyOfRow ??????
      // ????????? rowRender ??????????????????????????? rowKey?????????????????????
      const key = getRowIdentity(row, rowKey.value)
      let cur = treeData.value[key]
      let treeRowData = null
      if (cur) {
        treeRowData = {
          expanded: cur.expanded,
          level: cur.level,
          display: true,
        }
        if (typeof cur.lazy === 'boolean') {
          if (typeof cur.loaded === 'boolean' && cur.loaded) {
            treeRowData.noLazyChildren = !(cur.children && cur.children.length)
          }
          treeRowData.loading = cur.loading
        }
      }
      const tmp = [rowRender(row, $index, treeRowData)]
      // ??????????????????
      if (cur) {
        // currentRow ???????????? index??????????????????????????? TreeTable ??? index
        let i = 0
        const traverse = (children, parent) => {
          if (!(children && children.length && parent)) return
          children.forEach((node) => {
            // ???????????? display ????????????????????????????????????
            const innerTreeRowData = {
              display: parent.display && parent.expanded,
              level: parent.level + 1,
              expanded: false,
              noLazyChildren: false,
              loading: false,
            }
            const childKey = getRowIdentity(node, rowKey.value)
            if (childKey === undefined || childKey === null) {
              throw new Error('For nested data item, row-key is required.')
            }
            cur = { ...treeData.value[childKey] }
            // ?????????????????????????????????????????????????????????
            // ????????????????????????????????? expanded ?????????
            // ????????????????????? display ????????????????????? expanded ??? display ???????????????
            if (cur) {
              innerTreeRowData.expanded = cur.expanded
              // ???????????????????????????level ??????
              cur.level = cur.level || innerTreeRowData.level
              cur.display = !!(cur.expanded && innerTreeRowData.display)
              if (typeof cur.lazy === 'boolean') {
                if (typeof cur.loaded === 'boolean' && cur.loaded) {
                  innerTreeRowData.noLazyChildren = !(
                    cur.children && cur.children.length
                  )
                }
                innerTreeRowData.loading = cur.loading
              }
            }
            i++
            tmp.push(rowRender(node, $index + i, innerTreeRowData))
            if (cur) {
              const nodes =
                lazyTreeNodeMap.value[childKey] ||
                node[childrenColumnName.value]
              traverse(nodes, cur)
            }
          })
        }
        // ?????? root ?????????display ????????? true
        cur.display = true
        const nodes =
          lazyTreeNodeMap.value[key] || row[childrenColumnName.value]
        traverse(nodes, cur)
      }
      return tmp
    } else {
      return rowRender(row, $index, undefined)
    }
  }

  return {
    wrappedRowRender,
    tooltipContent,
    tooltipTrigger,
  }
}

export default useRender
