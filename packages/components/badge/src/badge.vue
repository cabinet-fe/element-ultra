<template>
  <div :class="ns.b()">
    <slot></slot>
    <transition :name="`${ns.namespace}-zoom-in-center`">
      <sup
        v-show="!hidden && (content || content === '0' || isDot)"
        :class="[
          ns.e('content'),
          ns.em('content', type),
          ns.is('fixed', !!$slots.default),
          ns.is('dot', isDot),
        ]"
        v-text="content"
      >
      </sup>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { isNumber } from '@element-ultra/utils'
import { badgeProps } from './badge'

defineOptions({
  name: 'ElBadge',
})

const props = defineProps(badgeProps)

const ns = useNamespace('badge')

const content = computed<string>(() => {
  if (props.isDot) return ''

  if (isNumber(props.value) && isNumber(props.max)) {
    return props.max < props.value ? `${props.max}+` : `${props.value}`
  }
  return `${props.value}`
})
</script>
