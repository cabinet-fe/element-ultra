import { createVNode, defineComponent, renderSlot, h, type PropType } from 'vue'
import { PatchFlags } from '@element-ultra/utils'
import { useNamespace, useSameTarget } from '@element-ultra/hooks'

import type { ExtractPropTypes, CSSProperties } from 'vue'
import type { ZIndexProperty } from 'csstype'

export const overlayProps = {
  mask: {
    type: Boolean,
    default: true,
  },
  customMaskEvent: {
    type: Boolean,
    default: false,
  },
  overlayClass: {
    type: [
      String,
      Array,
      Object,
    ] as PropType<string | string[] | Record<string, boolean>>,
  },
  zIndex: {
    type: [String, Number] as PropType<ZIndexProperty>,
  },
}
export type OverlayProps = ExtractPropTypes<typeof overlayProps>

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type OverlayEmits = typeof overlayEmits

export default defineComponent({
  name: 'ElOverlay',

  props: overlayProps,
  emits: overlayEmits,

  setup(props, { slots, emit }) {
    const ns = useNamespace('overlay')

    const onMaskClick = (e: MouseEvent) => {
      emit('click', e)
    }
    const { onClick, onMousedown, onMouseup } = useSameTarget(
      props.customMaskEvent ? undefined : onMaskClick
    )

    // init here
    return () => {
      return props.mask
        ? createVNode(
            'div',
            {
              class: [ns.b(), props.overlayClass],
              style: {
                zIndex: props.zIndex,
              },
              onClick,
              onMousedown,
              onMouseup,
            },
            [renderSlot(slots, 'default')],
            PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS,
            ['onClick', 'onMouseup', 'onMousedown']
          )
        : h(
            'div',
            {
              class: props.overlayClass,
              style: {
                zIndex: props.zIndex,
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              } as CSSProperties,
            },
            [renderSlot(slots, 'default')]
          )
    }
  },
})
