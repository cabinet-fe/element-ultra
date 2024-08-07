import { shallowRef, watch, reactive, useSlots } from 'vue'
import type { FinalTableColumn, TableProps } from './table'

type ColumnLayouts = Record<'left' | 'center' | 'right', FinalTableColumn[]>

export default function useColumns(params: { props: TableProps }) {
  const { props } = params

  const columnLayouts = shallowRef<ColumnLayouts>({
    left: [],
    center: [],
    right: []
  })

  const columns = shallowRef<FinalTableColumn[]>([])

  const slots = useSlots()

  watch(
    () => props.columns,
    _columns => {
      const result: ColumnLayouts = {
        left: [],
        center: [],
        right: []
      }

      if (!_columns?.length) {
        columnLayouts.value = result
        return
      }

      _columns.forEach(column => {
        // name统一转化为函数
        if (typeof column.name === 'string') {
          const { name } = column
          column.name = () => name
        }

        // 指定一个最小宽度
        if (!column.width && !column.minWidth) {
          column.minWidth = 100
        }

        // 始终保持render存在
        if (!column.render) {
          const slotRender = column.slot
            ? props.slots?.[column.slot] || slots[column.slot]
            : undefined
          if (slotRender) {
            column.render = ctx => slotRender(ctx)
          } else {
            column.render = ({ val }) => String(val ?? '')
          }
        }

        const { fixed } = column

        const reactiveColumn = reactive(column) as FinalTableColumn

        if (fixed === 'left') {
          result.left.push(reactiveColumn)
        } else if (fixed === 'right') {
          result.right.push(reactiveColumn)
        } else {
          result.center.push(reactiveColumn)
        }
      })

      // 计算固定列
      result.left.forEach((item, index, arr) => {
        if (index === 0) {
          item.left = 0
        } else {
          let pre = arr[index - 1]
          item.left = pre.left! + pre.width!
        }
      })

      // 计算固定列
      let len = result.right.length
      while (len-- > 0) {
        let cur = result.right[len]
        let pre = result.right[len + 1]
        if (pre) {
          cur.right = pre.right! + pre.width!
        } else {
          cur.right = 0
        }
      }

      if (result.left.length) {
        result.left[result.left.length - 1].typeLast = true
      }
      if (result.center.length) {
        result.center[result.center.length - 1].typeLast = true
      }
      if (result.right.length) {
        result.right[0].typeFirst = true
      }

      columnLayouts.value = result
      columns.value = Object.values(result).flat(1)
    },
    { immediate: true }
  )

  return {
    columnLayouts,
    columns
  }
}
