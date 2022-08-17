import { getCurrentInstance, useAttrs, useSlots } from 'vue'
import dayjs from 'dayjs'
import { isFunction } from '@element-ultra/utils'
import type { SetupContext } from 'vue'
import type { RangePickerSharedEmits } from '../props/shared'

// FIXME: extract this to `date-picker.ts`
export type Shortcut = {
  text: string
  value: [Date, Date] | (() => [Date, Date])
  onClick?: (ctx: Omit<SetupContext<RangePickerSharedEmits>, 'expose'>) => void
}

export const useShortcut = (lang: string) => {
  const { emit } = getCurrentInstance()!
  const attrs = useAttrs()
  const slots = useSlots()

  const handleShortcutClick = (shortcut: Shortcut) => {
    const shortcutValues = isFunction(shortcut.value)
      ? shortcut.value()
      : shortcut.value

    if (shortcutValues) {
      emit('pick', [
        dayjs(shortcutValues[0]).locale(lang),
        dayjs(shortcutValues[1]).locale(lang),
      ])
      return
    }
    if (shortcut.onClick) {
      shortcut.onClick({
        attrs,
        slots,
        emit,
      })
    }
  }

  return handleShortcutClick
}
