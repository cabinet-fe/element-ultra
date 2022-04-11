import type { ExtractPropTypes, PropType } from "vue"


export const textEditorProps = {
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