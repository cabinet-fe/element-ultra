<template>
  <transition :name="ns.b()" v-on="on">
    <slot></slot>
  </transition>
</template>
<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useNamespace } from '@element-ultra/hooks'

export default defineComponent({
  name: 'ElCollapseTransition',
  setup(props, { attrs }) {
    const ns = useNamespace('collapse-transition')

    return {
      ns,
      on: {
        beforeEnter(el) {
          if (!el.dataset) el.dataset = {}

          el.dataset.oldPaddingTop = el.style.paddingTop
          el.dataset.oldPaddingBottom = el.style.paddingBottom

          el.style.maxHeight = 0
          el.style.paddingTop = 0
          el.style.paddingBottom = 0
        },

        enter(el) {
          el.dataset.oldOverflow = el.style.overflow
          if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`
            el.style.paddingTop = el.dataset.oldPaddingTop
            el.style.paddingBottom = el.dataset.oldPaddingBottom
          } else {
            el.style.maxHeight = 0
            el.style.paddingTop = el.dataset.oldPaddingTop
            el.style.paddingBottom = el.dataset.oldPaddingBottom
          }

          el.style.overflow = 'hidden'
        },

        afterEnter(el) {
          el.style.maxHeight = ''
          el.style.overflow = el.dataset.oldOverflow
          let style = (attrs.style || {}) as Record<string, any>
          Object.keys(style).forEach((key) => {
            let  _key = key.replace(/([A-Z])/g, (_, c) => `-${c.toLowerCase()}`)
            el.style[_key] = style[key]
          })
        },

        beforeLeave(el) {
          if (!el.dataset) el.dataset = {}
          el.dataset.oldPaddingTop = el.style.paddingTop
          el.dataset.oldPaddingBottom = el.style.paddingBottom
          el.dataset.oldOverflow = el.style.overflow

          el.style.maxHeight = `${el.scrollHeight}px`
          el.style.overflow = 'hidden'
        },

        leave(el) {
          if (el.scrollHeight !== 0) {
            el.style.maxHeight = 0
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
          }
        },

        afterLeave(el) {
          el.style.maxHeight = ''
          el.style.overflow = el.dataset.oldOverflow
          el.style.paddingTop = el.dataset.oldPaddingTop
          el.style.paddingBottom = el.dataset.oldPaddingBottom
        },
      },
    }
  },
})
</script>
