<template>
  <div
    :style="style"
    :class="[
      ns.b(),
      ns.is(stepsProps.direction),
      ns.is('flex', state.isLast && !stepsProps.space && !isCenter),
      ns.is('center', isCenter && !isVertical)
    ]"
    @click="emit('click',state.status)"
  >
    <!-- icon & line -->
    <div :class="[ns.e('head'), ns.is(state.status)]">
      <div :class="ns.e('line')">
        <i :class="ns.e('line-inner')"></i>
      </div>

      <div :class="[ns.e('icon'), ns.is(icon ? 'icon' : 'text')]">
        <slot
          v-if="state.status !== 'success' && state.status !== 'error'"
          name="icon"
        >
          <el-icon v-if="icon" :class="ns.e('icon-inner')">
            <component :is="icon" />
          </el-icon>
          <div v-else :class="ns.e('icon-inner')">
            {{ state.index + 1 }}
          </div>
        </slot>
        <el-icon v-else :class="[ns.e('icon-inner'), ns.is('status')]">
          <check v-if="state.status === 'success'" />
          <close v-else />
        </el-icon>
      </div>
    </div>
    <!-- title & description -->
    <div :class="ns.e('main')">
      <div :class="[ns.e('title'), ns.is(state.status)]">
        <slot name="title">{{ title }}</slot>
      </div>
      <div :class="[ns.e('description'), ns.is(state.status)]">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  shallowReactive
} from 'vue'
import { ElIcon } from '@element-ultra/components/icon'
import { Close, Check } from '@element-plus/icons-vue'
import { useNamespace } from '@element-ultra/hooks'
import { stepProps, type StepStatus } from './steps'
import { stepsInjectionKey } from './token'

defineOptions({
  name: 'ElStep'
})

defineProps(stepProps)

const emit = defineEmits({
  click: (status: StepStatus) => true
})

const ns = useNamespace('step')
const { stepsProps, stepsCount, addStep, removeStep } = inject(stepsInjectionKey)!
const currentInstance = getCurrentInstance()!

const state = shallowReactive({
  // 当前状态
  status: '' as StepStatus,
  // 实例id
  uid: currentInstance.uid,
  // 是否是最后一个
  isLast: false,
  // 序号
  index: -1
})

addStep(state)

onBeforeUnmount(() => {
  removeStep(state)
})

const isCenter = computed(() => {
  return stepsProps.alignCenter
})
const isVertical = computed(() => {
  return stepsProps.direction === 'vertical'
})

const style = computed(() => {
  const { space } = stepsProps

  const style: Record<string, any> = {
    flexBasis:
      typeof space === 'number'
        ? `${space}px`
        : space
        ? space
        : `${100 / (stepsCount.value - (isCenter.value ? 0 : 1))}%`
  }
  if (isVertical.value) return style
  if (state.isLast) {
    style.maxWidth = `${100 / stepsCount.value}%`
  }
  return style
})
</script>
