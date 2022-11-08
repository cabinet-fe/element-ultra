import { useConfig } from '@element-ultra/hooks'
import {
  computed,
  CSSProperties,
  shallowReactive,
  shallowRef,
  watch
} from 'vue'
import type { DataTableColumn, DataTableProps } from '../data-table'
import type { TableHeader } from '../utils'

export default function useStyle(props: DataTableProps) {
  /**
   * 获取单元格的通用样式
   * @param column 列
   */
  const getCellStyle = (column: DataTableColumn) => {
    const { width, minWidth } = column
    const { columnMinWidth } = props
    return {
      width: width ? width + 'px' : undefined,
      minWidth: (width || minWidth || columnMinWidth) + 'px'
    }
  }

  /** 表格大小尺寸映射 */
  const [config] = useConfig()

  const sizeMapper = {
    small: 24,
    default: 32,
    large: 40
  }
  /** 表格项尺寸 */
  const itemSize = computed(() => {
    const size = props.size || config.size || 'default'

    return sizeMapper[size] || 32
  })

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

  const scrollState = shallowReactive({
    scrollLeft: 0,
    scrollWidth: 0,
    offsetWidth: 0
  })

  const showLeftFixedShadow = shallowRef(false)
  const showRightFixedShadow = shallowRef(false)

  /** 计算表格固定栏的阴影 */
  watch(scrollState, ({ scrollLeft, scrollWidth, offsetWidth }) => {
    showLeftFixedShadow.value = scrollLeft > 0 && scrollWidth > offsetWidth
    showRightFixedShadow.value = scrollWidth - offsetWidth > scrollLeft
  })

  // 表头和表底的引用, 用以计算表体的高度
  const headerRef = shallowRef<HTMLDivElement>()
  const footerRef = shallowRef<HTMLDivElement>()

  const bodyHeight = computed(() => {
    return `calc(100% - ${
      (headerRef.value?.offsetHeight ?? 0) +
      (footerRef.value?.offsetHeight ?? 0)
    }px)`
  })

  return {
    /** 滚动状态 */
    scrollState,

    /** 行高大小 */
    itemSize,

    /** 显示左侧固定栏的阴影 */
    showLeftFixedShadow,

    /** 显示右侧固定栏的阴影 */
    showRightFixedShadow,

    /** 获取单元格的通用样式 */
    getCellStyle,

    /** 获取表头单元格的样式 */
    getHeaderCellStyle,

    /** 获取额外列的单元格样式 */
    getExtraCellStyle,

    headerRef,

    footerRef,

    /** 表体的高度 */
    bodyHeight
  }
}

export type UseStyleReturned = ReturnType<typeof useStyle>
