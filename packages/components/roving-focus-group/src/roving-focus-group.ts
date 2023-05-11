
import { createCollectionWithScope } from 'components/collection'
import type { ExtractPropTypes, HTMLAttributes, PropType, StyleValue } from 'vue'

export const rovingFocusGroupProps = {
  style: { type: [String, Array, Object] as PropType<StyleValue> },
  currentTabId: {
    type: String as PropType<string | null>
  },
  defaultCurrentTabId: String,
  loop: Boolean,
  dir: {
    type: String, // left for direction support
    values: ['ltr', 'rtl'],
    default: 'ltr'
  },
  orientation: {
    // left for orientation support
    type: String as PropType<HTMLAttributes['aria-orientation']>
  },

  onBlur: Function,
  onFocus: Function,
  onMousedown: Function
}

export type ElRovingFocusGroupProps = ExtractPropTypes<
  typeof rovingFocusGroupProps
>

const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY
} = createCollectionWithScope('RovingFocusGroup')

export {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY
}
