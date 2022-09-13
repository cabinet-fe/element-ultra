import { CSSProperties, shallowRef } from 'vue'
import type { DataTableColumn, DataTableProps } from '../data-table'
import type { TableHeader } from '../utils'

export default function useStyle(props: DataTableProps) {
  const { columnMinWidth } = props

  /**
   * 获取单元格的通用样式
   * @param column 列
   */
  const getCellStyle = (column: DataTableColumn) => {
    const { width, minWidth } = column
    return {
      width: width ? width + 'px' : undefined,
      minWidth: (width || minWidth || columnMinWidth) + 'px'
    }
  }

  /**
   * 获取表头单元格的样式
   * @param header 表头
   */
  const getHeaderCellStyle = (header: TableHeader) => {
    const style: CSSProperties = {
      textAlign: header.data.align || 'left'
    }
    // 叶子节点会有宽度和最小宽度的样式
    if (header.isLeaf) {
      Object.assign(style, getCellStyle(header.data))
    }
    return style
  }

  /** 获取额外列的单元格样式 */
  const getExtraCellStyle = (column: DataTableColumn) => {

    return Object.assign(
      {
        textAlign: column.align
      },
      getCellStyle(column)
    )
  }

  /** 左偏移量 */
  const scrollLeft = shallowRef(0)

  return {
    /** 水平滚动的偏移量 */
    scrollLeft,

    /** 获取单元格的通用样式 */
    getCellStyle,

    /** 获取表头单元格的样式 */
    getHeaderCellStyle,

    /** 获取额外列的单元格样式 */
    getExtraCellStyle
  }
}

export type UseStyleReturned = ReturnType<typeof useStyle>