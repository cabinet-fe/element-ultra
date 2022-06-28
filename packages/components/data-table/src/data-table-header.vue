<!-- 表格头部, 此处做列相关的操作, 比如存放列信息, 排序 -->
<script lang="tsx">
import { useNamespace } from '@element-ultra/hooks'
import { defineComponent, inject } from 'vue'
import { dataTableToken } from './token'
import type { TreeNode } from './utils'

export default defineComponent({
  setup() {
    const ns = useNamespace('data-table')
    const cellClass = ns.e('header-cell')

    const { headerRows } = inject(dataTableToken)!

    /**
     * 渲染行
     * @param row 行
     */
    const renderRow = (row: TreeNode[], rowIndex: number) => {
      return row.map(column => {
        let childrenLen = column.children?.length
        let rowspan: number | undefined = undefined
        let colspan: number | undefined = undefined

        if (!childrenLen) {
          rowspan = headerRows.value.length - rowIndex
        }
        if (column._leafSize) {
          colspan = column._leafSize
        }

        return (
          <th
            rowspan={rowspan}
            colspan={colspan}
            class={cellClass}
            key={column.key}
          >
            {column.name}
          </th>
        )
      })
    }

    /** 行 */
    const renderRows = () =>
      headerRows.value.map((row, rowIndex) => (
        <tr>{renderRow(row, rowIndex)}</tr>
      ))

    return () => (
      <table class={ns.e('header')} border>
        {renderRows()}
      </table>
    )
  }
})
</script>
