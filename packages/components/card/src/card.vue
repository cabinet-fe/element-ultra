<template>
  <div ref="cardRef" :class="[ns.b(), ns.is(`${shadow}-shadow`)]">
    <div v-if="$slots.header || header" :id="header" :class="ns.e('header')">
      <slot name="header">{{ header }}</slot>

      <el-tooltip v-if="tips" :content="tips" raw-content>
        <el-icon>
          <QuestionFilled />
        </el-icon>
      </el-tooltip>
    </div>
    <div :class="ns.e('body')" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNamespace } from '@element-ultra/hooks'
import { pageContextKey } from '@element-ultra/tokens'
import { inject, onMounted, onUnmounted, shallowRef } from 'vue'
import { cardProps } from './card'
import ElIcon from '@element-ultra/components/icon'
import ElTooltip from '@element-ultra/components/tooltip'
import { QuestionFilled } from '@element-plus/icons-vue'

defineOptions({
  name: 'ElCard'
})
defineProps(cardProps)
const ns = useNamespace('card')

const { observer } = inject(pageContextKey, undefined) || {}
const cardRef = shallowRef<HTMLDivElement>()

onMounted(() => {
  cardRef.value && observer?.observe(cardRef.value)
})

onUnmounted(() => {
  cardRef.value && observer?.unobserve(cardRef.value)
})
</script>
