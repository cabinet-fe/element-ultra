import type { ExtractPropTypes, PropType } from 'vue'
import type Divider from './divider.vue'

export type BorderStyle = CSSStyleDeclaration['borderStyle']

export const dividerProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  contentPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  borderStyle: {
    type: String as PropType<BorderStyle>,
    default: 'solid'
  }
}
export type DividerProps = ExtractPropTypes<typeof dividerProps>

export type DividerInstance = InstanceType<typeof Divider>
