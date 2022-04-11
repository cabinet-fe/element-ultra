import { FORM_COMPONENT_PROPS } from "@element-ultra/constants"
import type { ExtractPropTypes, PropType } from "vue"


export const textEditorProps = {
  ...FORM_COMPONENT_PROPS,
  mode: {
    type: String as PropType<'default' | 'simple'>,
    default: 'default'
  },

  modelValue: {
    type: String
  },

  placeholder: {
    type: String,
    default: '请输入内容'
  }
} as const 

export type TextEditorProps = ExtractPropTypes<typeof textEditorProps>