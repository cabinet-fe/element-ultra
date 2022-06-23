import type { ExtractPropTypes } from 'vue'

export const tabPaneProps = {
  label: {
    type: String,
    default: '',
  },
  name: {
    type: [String, Number],
    default: '',
  },
  closable: Boolean,
  disabled: Boolean,
  lazy: Boolean,
}

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>
