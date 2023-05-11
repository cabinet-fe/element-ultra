import { isString } from 'utils'

import type { ExtractPropTypes, PropType } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import type { MenuItemRegistered } from './types'

export const menuItemProps = {
  index: {
    type: [String, null] as PropType<string | null>,
    default: null,
  },
  route: {
    type: [String, Object] as PropType<RouteLocationRaw>,
  },
  disabled: Boolean,
}
export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>

export const menuItemEmits = {
  click: (item: MenuItemRegistered) =>
    isString(item.index) && Array.isArray(item.indexPath),
}
export type MenuItemEmits = typeof menuItemEmits
