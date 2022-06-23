<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@element-ultra/hooks'

const spaceItem = {
  prefixCls: {
    type: String,
    default: ''
  }
}

export default defineComponent({
  props: spaceItem,

  setup(props) {
    const ns = useNamespace('space')

    const classes = computed(() => `${props.prefixCls || ns.b()}__item`)

    return {
      classes
    }
  }
})
</script>
