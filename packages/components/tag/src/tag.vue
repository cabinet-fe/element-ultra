<template>
  <span
    v-if="!disableTransitions"
    :class="classes"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  >
    <span :style="{ maxWidth }" :class="ns.e('content')">
      <slot></slot>
    </span>
    <el-icon v-if="closable" :class="ns.e('close')" @click="handleClose">
      <close />
    </el-icon>
  </span>
  <transition v-else :name="`${ns.namespace}-zoom-in-center`">
    <span
      :class="classes"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <span :class="ns.e('content')">
        <slot></slot>
      </span>
      <el-icon v-if="closable" :class="ns.e('close')" @click="handleClose">
        <close />
      </el-icon>
    </span>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ElIcon from '@element-ultra/components/icon'
import { Close } from 'icon-ultra'

import { useSize, useNamespace } from '@element-ultra/hooks'
import { tagProps, tagEmits } from './tag'

export default defineComponent({
  name: 'ElTag',

  components: { ElIcon, Close },

  props: tagProps,
  emits: tagEmits,

  setup(props, { emit }) {
    const tagSize = useSize({ props })
    const ns = useNamespace('tag')
    const classes = computed(() => {
      const { type, hit, effect, closable } = props
      return [
        ns.b(),
        ns.is('closable', closable),
        ns.m(type),
        ns.m(tagSize.value),
        ns.m(effect),
        ns.is('hit', hit),
      ]
    })

    // methods
    const handleClose = (event: MouseEvent) => {
      event.stopPropagation()
      emit('close', event)
    }

    const handleClick = (event: MouseEvent) => {
      emit('click', event)
    }

    return {
      ns,
      classes,
      handleClose,
      handleClick,
    }
  },
})
</script>
