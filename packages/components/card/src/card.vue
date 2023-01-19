<!--
 * @Author: whj
 * @Date: 2022-03-28 14:08:38
 * @LastEditors: whj
 * @LastEditTime: 2023-01-19 16:04:06
 * @FilePath: /element-ultra/packages/components/card/src/card.vue
 *
-->
<template>
  <div :class="[ns.b(), ns.is(`${shadow}-shadow`), ns.is('border', border)]">
    <div v-if="$slots.header || header" :id="header" :class="ns.e('header')">
      <slot name="header">{{ header }}</slot>

      <el-tooltip v-if="tips" :content="tips" raw-content>
        <el-icon>
          <QuestionFilled />
        </el-icon>
      </el-tooltip>
    </div>
    <div :class="ns.e('body')">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNamespace } from '@element-ultra/hooks'
import { cardProps } from './card'
import ElIcon from '@element-ultra/components/icon'
import ElTooltip from '@element-ultra/components/tooltip'
import { QuestionFilled } from 'icon-ultra'

defineOptions({
  name: 'ElCard'
})
defineProps(cardProps)
const ns = useNamespace('card')

// const { observer } = inject(pageContextKey, undefined) || {}
// const cardRef = shallowRef<HTMLDivElement>()

// onMounted(() => {
//   cardRef.value && observer?.observe(cardRef.value)
// })

// onUnmounted(() => {
//   cardRef.value && observer?.unobserve(cardRef.value)
// })
</script>
