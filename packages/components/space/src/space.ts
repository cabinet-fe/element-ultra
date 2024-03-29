import {
  defineComponent,
  renderSlot,
  createVNode,
  createTextVNode,
  isVNode,
  type PropType
} from 'vue'
import { isString } from '@vue/shared'
import {
  PatchFlags,
  isFragment,
  isValidElementNode,
  isArray,
  isNumber
} from '@element-ultra/utils'
import { componentSizes } from '@element-ultra/shared'
import Item from './item.vue'
import { useSpace } from './use-space'

import type { VNode, StyleValue, ExtractPropTypes, VNodeChild } from 'vue'
import type { AlignItemsProperty } from 'csstype'

export const spaceProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },

  class: {
    type: [String, Object, Array] as PropType<
      string | string[] | Record<string, boolean>
    >,
    default: ''
  },

  style: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: ''
  },

  alignment: {
    type: String as PropType<AlignItemsProperty>,
    default: 'center'
  },

  prefixCls: {
    type: String
  },

  spacer: {
    type: [Object, String, Number, Array] as PropType<VNodeChild>,
    default: null,
    validator: (val: unknown) => isVNode(val) || isNumber(val) || isString(val)
  },

  wrap: {
    type: Boolean,
    default: false
  },

  fill: {
    type: Boolean,
    default: false
  },

  fillRatio: {
    type: Number,
    default: 100
  },

  size: {
    type: [String, Array, Number],
    values: componentSizes,
    validator: (val: unknown): val is [number, number] | number => {
      return (
        isNumber(val) ||
        (isArray(val) && val.length === 2 && val.every(i => isNumber(i)))
      )
    }
  }
}
export type SpaceProps = ExtractPropTypes<typeof spaceProps>

export default defineComponent({
  name: 'ElSpace',

  props: spaceProps,

  setup(props, { slots }) {
    const { classes, containerStyle, itemStyle } = useSpace(props)

    return () => {
      const { spacer, prefixCls, direction } = props

      const children = renderSlot(slots, 'default', { key: 0 }, () => [])
      // retrieve the children out via a simple for loop
      // the edge case here is that when users uses directives like <v-for>, <v-if>
      // we need to go one layer deeper

      if ((children.children ?? []).length === 0) return null

      // loop the children, if current children is rendered via `renderList` or `<v-for>`
      if (isArray(children.children)) {
        let extractedChildren: VNode[] = []
        children.children.forEach((child, loopKey) => {
          if (isFragment(child)) {
            if (isArray(child.children)) {
              child.children.forEach((nested, key) => {
                extractedChildren.push(
                  createVNode(
                    Item,
                    {
                      style: itemStyle.value,
                      prefixCls,
                      key: `nested-${key}`
                    },
                    {
                      default: () => [nested]
                    },
                    PatchFlags.PROPS | PatchFlags.STYLE,
                    ['style', 'prefixCls']
                  )
                )
              })
            }
            // if the current child is valid vnode, then append this current vnode
            // to item as child node.
          } else if (isValidElementNode(child)) {
            extractedChildren.push(
              createVNode(
                Item,
                {
                  style: itemStyle.value,
                  prefixCls,
                  key: `LoopKey${loopKey}`
                },
                {
                  default: () => [child]
                },
                PatchFlags.PROPS | PatchFlags.STYLE,
                ['style', 'prefixCls']
              )
            )
          }
        })

        if (spacer) {
          // track the current rendering index, when encounters the last element
          // then no need to add a spacer after it.
          const len = extractedChildren.length - 1
          extractedChildren = extractedChildren.reduce<VNode[]>(
            (acc, child, idx) => {
              const children = [...acc, child]
              if (idx !== len) {
                children.push(
                  createVNode(
                    'span',
                    // adding width 100% for vertical alignment,
                    // when the spacer inherit the width from the
                    // parent, this span's width was not set, so space
                    // might disappear
                    {
                      style: [
                        itemStyle.value,
                        direction === 'vertical' ? 'width: 100%' : null
                      ],
                      key: idx
                    },
                    [
                      // if spacer is already a valid vnode, then append it to the current
                      // span element.
                      // otherwise, treat it as string.
                      isVNode(spacer)
                        ? spacer
                        : createTextVNode(spacer as string, PatchFlags.TEXT)
                    ],
                    PatchFlags.STYLE
                  )
                )
              }
              return children
            },
            []
          )
        }

        // spacer container.
        return createVNode(
          'div',
          {
            class: classes.value,
            style: containerStyle.value
          },
          extractedChildren,
          PatchFlags.STYLE | PatchFlags.CLASS
        )
      }

      return children.children
    }
  }
})
