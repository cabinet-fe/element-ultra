<script lang="ts">
import { computed, defineComponent, cloneVNode, h } from 'vue'
import { gridProps, gridEmits } from './grid'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElGrid',

  props: gridProps,
  emits: gridEmits,

  setup(props, { slots }) {
    const style = computed(() => {
      const result: CSSProperties = {
        gridTemplateColumns: `repeat(${props.cols}, minmax(0px, 1fr))`,
        gap: props.gap
          .split(',')
          .map((s) => `${s}px`)
          .join(' '),
      }
      return result
    })

    const getSlots = () => {
      const defaultSlots = slots.default?.() || []
      return defaultSlots.map((node) => {
        const ret = cloneVNode(node, {
          style: {
            // gridColumn: 'span 2'
          },
        })
        return ret
      })
    }

    return {
      style,
      getSlots,
    }
  },

  render() {
    const { tag, style, $attrs } = this
    return h(
      tag,
      {
        ...this.$attrs,
        class: `el-grid ${$attrs.class}`,
        style: {
          ...style,
          ...($attrs.style as Record<string, any>),
        },
      },
      this.getSlots()
    )
  },
})
</script>
