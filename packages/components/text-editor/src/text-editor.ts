import { FORM_COMPONENT_PROPS } from '@element-ultra/shared'
import type { ExtractPropTypes, PropType } from 'vue'

export type ToolBarKeys =
  | '|'
  | 'blockquote'
  | 'header1'
  | 'header2'
  | 'header3'
  | 'bold'
  | 'underline'
  | 'italic'
  | 'clearStyle'
  | 'bgColor'
  | 'color'
  | 'through'
  | 'bulletedList'
  | 'numberedList'
  | 'todo'
  | 'justifyLeft'
  | 'justifyRight'
  | 'justifyCenter'
  | 'insertLink'
  | 'group-image'
  | 'insertVideo'
  | 'insertTable'
  | 'codeBlock'
  | 'undo'
  | 'redo'
  | 'fullScreen'

export const textEditorProps = {
  ...FORM_COMPONENT_PROPS,
  mode: {
    type: String as PropType<'default' | 'simple'>,
    default: 'default'
  },

  /** 指定移除的工具栏功能 */
  exclude: {
    type: Array as PropType<ToolBarKeys[]>
  },

  /** 指定包含的工具栏功能 */
  include: {
    type: Array as PropType<ToolBarKeys[]>
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
