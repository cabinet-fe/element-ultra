<template>
  <table :class="ns.b()" @click="handleYearTableClick">
    <tbody>
      <tr v-for="(_, i) in 2" :key="i">
        <DateCell
          v-for="(__, j) in 4"
          :key="`${i}_${j}`"
          :row-index="i"
          :col-index="j"
        />
      </tr>
      <tr>
        <DateCell :row-index="2" :col-index="0" />
        <DateCell :row-index="2" :col-index="1" />
      </tr>
    </tbody>
  </table>
</template>

<script lang="tsx" setup>
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { useNamespace } from '@element-ultra/hooks'
import { rangeArr } from '@element-ultra/components/time-picker'
import { castArray, hasClass } from '@element-ultra/utils'
import { basicYearTableProps } from '../props/basic-year-table'

const datesInYear = (year: number, lang: string) => {
  const firstDay = dayjs(String(year)).locale(lang).startOf('year')
  const lastDay = firstDay.endOf('year')
  const numOfDays = lastDay.dayOfYear()
  return rangeArr(numOfDays).map(n => firstDay.add(n, 'day').toDate())
}

const DateCell = defineComponent({
  props: {
    rowIndex: {
      type: Number,
      required: true
    },
    colIndex: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    return () => {
      const cellYear = startYear.value + props.rowIndex * 4 + props.colIndex
      return (
        <td class='available' class={getCellStyle(cellYear)}>
          <a class='cell'>{cellYear}</a>
        </td>
      )
    }
  }
})

const getCellStyle = (year: number) => {
  const style = {} as any
  const today = dayjs().locale('zh-cn')

  style.disabled = props.disabledDate
    ? datesInYear(year, 'zh-cn').every(props.disabledDate)
    : false

  style.current =
    castArray(props.parsedValue).findIndex(_ => _.year() === year) >= 0

  style.today = today.year() === year

  return style
}

const props = defineProps(basicYearTableProps)
const emit = defineEmits(['pick'])

const ns = useNamespace('year-table')

const tbodyRef = ref<HTMLElement>()
const currentCellRef = ref<HTMLElement>()
const startYear = computed(() => {
  return Math.floor(props.date!.year() / 10) * 10
})

const focus = () => {
  currentCellRef.value?.focus()
}

const handleYearTableClick = (event: MouseEvent | KeyboardEvent) => {
  const clickTarget = event.target as HTMLDivElement
  const target = clickTarget.closest('td')
  if (target) {
    if (hasClass(target, 'disabled')) return
    const year = target.textContent || target.innerText
    emit('pick', Number(year))
  }
}

watch(
  () => props.date,
  async () => {
    if (tbodyRef.value?.contains(document.activeElement)) {
      await nextTick()
      currentCellRef.value?.focus()
    }
  }
)

defineExpose({
  /**
   * @description focus on the current cell
   */
  focus
})
</script>
