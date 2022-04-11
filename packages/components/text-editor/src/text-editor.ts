import type { ExtractPropTypes } from "vue"


export const textEditorProps = {
  mode: {
    type: String,
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