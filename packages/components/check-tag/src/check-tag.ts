import { isBoolean } from 'utils'
import type CheckTag from './check-tag.vue'
import type { ExtractPropTypes } from 'vue'

export const checkTagProps = {
  checked: {
    type: Boolean,
    default: false
  }
}
export type CheckTagProps = ExtractPropTypes<typeof checkTagProps>

export const checkTagEmits = {
  'update:checked': (value: boolean) => isBoolean(value),
  change: (value: boolean) => isBoolean(value)
}
export type CheckTagEmits = typeof checkTagEmits

export type CheckTagInstance = InstanceType<typeof CheckTag>
