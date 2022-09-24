import { useConfig } from '@element-ultra/hooks'
import { computed, CSSProperties, shallowRef, watch } from 'vue'
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

  const scrollLeft = shallowRef(0)
  const scrollWidth = shallowRef(0)
  const offsetWidth = shallowRef(0)

  const showLeftFixedShadow = shallowRef(false)
  const showRightFixedShadow = shallowRef(false)

  /** 计算表格固定栏的阴影 */
  const updateFixedColumnsShadow = () => {
    showLeftFixedShadow.value =
      scrollLeft.value > 0 && scrollWidth.value > offsetWidth.value
    showRightFixedShadow.value =
      scrollWidth.value - offsetWidth.value > scrollLeft.value
  }

  watch(
    [() => offsetWidth.value, () => scrollWidth.value, () => scrollLeft.value],
    () => {
      updateFixedColumnsShadow()
    }
  )

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
    /** 水平滚动的偏移量 */
    scrollLeft,

    /** 水平滚动宽度 */
    scrollWidth,

    /** 滚动容器的宽度 */
    offsetWidth,

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

    updateFixedColumnsShadow,

    headerRef,

    footerRef,

    /** 表体的高度 */
    bodyHeight
  }
}

export type UseStyleReturned = ReturnType<typeof useStyle>
