import { iconPropType } from '@element-ultra/utils'
import { EVENT_CODE } from '@element-ultra/constants'
import { createCollectionWithScope } from '@element-ultra/components/collection'
import {
  useTooltipTriggerProps,
  useTooltipContentProps
} from '@element-ultra/components/tooltip'
import type { Options } from '@popperjs/core'

import type { ButtonTypes } from '@element-ultra/components/button'
import type { Placement } from '@element-ultra/components/popper'
import type { ComponentInternalInstance, ComputedRef, PropType } from 'vue'
import type { Nullable } from '@element-ultra/utils'

export interface IElDropdownInstance {
  instance?: ComponentInternalInstance
  dropdownSize?: ComputedRef<string>
  handleClick?: () => void
  commandHandler?: (...arg) => void
  show?: () => void
  hide?: () => void
  trigger?: ComputedRef<string>
  hideOnClick?: ComputedRef<boolean>
  triggerElm?: ComputedRef<Nullable<HTMLButtonElement>>
}

export const dropdownProps = {
  trigger: useTooltipTriggerProps.trigger,
  effect: {
    ...useTooltipContentProps.effect,
    default: 'light'
  },
  type: {
    type: String as PropType<ButtonTypes>
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom'
  },
  popperOptions: {
    type: Object as PropType<Partial<Options>>,
    default: () => ({})
  },
  size: {
    type: String,
    default: ''
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  maxHeight: {
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  popperClass: {
    type: String,
    default: ''
  }
}

export const dropdownItemProps = {
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: iconPropType
  }
}

export const dropdownMenuProps = {
  onKeydown: { type: Function as PropType<(e: KeyboardEvent) => void> }
}

export const FIRST_KEYS = [
  EVENT_CODE.down,
  EVENT_CODE.pageDown,
  EVENT_CODE.home
]

export const LAST_KEYS = [EVENT_CODE.up, EVENT_CODE.pageUp, EVENT_CODE.end]

export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]

const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY
} = createCollectionWithScope('Dropdown')

export {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY as DROPDOWN_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as DROPDOWN_COLLECTION_ITEM_INJECTION_KEY
}
