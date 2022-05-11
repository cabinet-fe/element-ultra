<template>
  <table class="el-month-table" @click="handleMonthTableClick" @mousemove="handleMouseMove">
    <tbody>
      <tr v-for="(row, key) in rows" :key="key">
        <td v-for="(cell, key_) in row" :key="key_" :class="getCellStyle(cell)">
          <div>
            <a class="cell">
              {{ months[cell.index] }}
            </a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import dayjs from 'dayjs'
import { rangeArr } from '@element-ultra/components/time-picker'
import { hasClass, castArray } from '@element-ultra/utils'

import type { PropType } from 'vue'
import type { Dayjs } from 'dayjs'

const datesInMonth = (year: number, month: number, lang: string) => {
  const firstDay = dayjs().locale(lang).startOf('month').month(month).year(year)
  const numOfDays = firstDay.daysInMonth()
  return rangeArr(numOfDays).map(n => firstDay.add(n, 'day').toDate())
}

export default defineComponent({
  props: {
    disabledDate: {
      type: Function as PropType<(_: Date) => boolean>
    },
    selectionMode: {
      type: String,
      default: 'month'
    },
    minDate: {
      type: Object as PropType<Dayjs>
    },
    maxDate: {
      type: Object as PropType<Dayjs>
    },
    date: {
      type: Object as PropType<Dayjs>,
      required: true
    },
    parsedValue: {
      type: Object as PropType<Dayjs>
    },
    rangeState: {
      type: Object,
      default: () => ({
        endDate: null,
        selecting: false
      })
    }
  },

  emits: ['changerange', 'pick', 'select'],

  setup(props, ctx) {
    let months = [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ]

    const lastRow = ref(null)
    const lastColumn = ref(null)
    const rows = computed(() => {
      // TODO: refactory rows / getCellClasses

      const now = dayjs().locale('zh-cn').startOf('month')

      let cells = Array.from({ length: 12 }).map((_, i) => {
        const calTime = props.date.startOf('year').month(i)
        const cellDate = calTime.toDate()
        const calEndDate =
          props.rangeState.endDate || props.maxDate || (props.rangeState.selecting && props.minDate)

        // 日期范围内
        let inRange =
          (props.minDate &&
            calTime.isSameOrAfter(props.minDate, 'month') &&
            calEndDate &&
            calTime.isSameOrBefore(calEndDate, 'month')) ||
          (props.minDate &&
            calTime.isSameOrBefore(props.minDate, 'month') &&
            calEndDate &&
            calTime.isSameOrAfter(calEndDate, 'month'))

        let cell = {
          index: i,
          // 单元格索引 / 一行的数量 向下取整即为行号
          row: Math.floor(i / 4),
          column: i % 4,
          isToday: now.isSame(calTime),
          inRange,
          start: false,
          end: false,
          disabled: props.disabledDate?.(cellDate) || false
        }

        if (props.minDate?.isSameOrAfter(calEndDate)) {
          cell.start = calEndDate && calTime.isSame(calEndDate, 'month')
          cell.end = props.minDate && calTime.isSame(props.minDate, 'month')
        } else {
          cell.start = props.minDate ? calTime.isSame(props.minDate, 'month') : false
          cell.end = calEndDate && calTime.isSame(calEndDate, 'month')
        }

        return cell
      })

      return [cells.slice(0, 4), cells.slice(4, 8), cells.slice(8)]
    })
    const getCellStyle = cell => {
      const style = {} as any
      const year = props.date.year()
      const month = cell.index

      style.disabled = props.disabledDate
        ? datesInMonth(year, month, 'zh-cn').every(props.disabledDate)
        : false
      style.current =
        castArray(props.parsedValue).findIndex(
          date => date.year() === year && date.month() === month
        ) >= 0
      style.today =  cell.isToday

      if (cell.inRange) {
        style['in-range'] = true

        if (cell.start) {
          style['start-date'] = true
        }

        if (cell.end) {
          style['end-date'] = true
        }
      }
      return style
    }

    const handleMouseMove = event => {
      if (!props.rangeState.selecting) return

      let target = event.target
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return

      const row = target.parentNode.rowIndex
      const column = target.cellIndex
      // can not select disabled date
      if (rows.value[row][column].disabled) return

      // only update rangeState when mouse moves to a new cell
      // this avoids frequent Date object creation and improves performance
      if (row !== lastRow.value || column !== lastColumn.value) {
        lastRow.value = row
        lastColumn.value = column
        ctx.emit('changerange', {
          selecting: true,
          endDate: props.date.startOf('year').month(row * 4 + column)
        })
      }
    }
    const handleMonthTableClick = event => {
      let target = event.target
      if (target.tagName === 'A') {
        target = target.parentNode.parentNode
      }
      if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return
      if (hasClass(target, 'disabled')) return
      const column = target.cellIndex
      const row = target.parentNode.rowIndex
      const month = row * 4 + column
      const newDate = props.date.startOf('year').month(month)
      if (props.selectionMode === 'range') {
        if (!props.rangeState.selecting) {
          ctx.emit('pick', { minDate: newDate, maxDate: null })
          ctx.emit('select', true)
        } else {
          if (newDate >= props.minDate) {
            ctx.emit('pick', { minDate: props.minDate, maxDate: newDate })
          } else {
            ctx.emit('pick', { minDate: newDate, maxDate: props.minDate })
          }
          ctx.emit('select', false)
        }
      } else {
        ctx.emit('pick', month)
      }
    }

    return {
      handleMouseMove,
      handleMonthTableClick,
      rows,
      getCellStyle,
      months
    }
  }
})
</script>
