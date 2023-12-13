import type { PropType } from "vue";

export const FORM_COMPONENT_PROPS = {
  label: {
    type: String
  },
  field: {
    type: String
  },
  tips: {
    type: String
  },
  span: {
    type: [String, Number] as PropType<'max' | number>
  },
  required: {
    type: Boolean
  }
}