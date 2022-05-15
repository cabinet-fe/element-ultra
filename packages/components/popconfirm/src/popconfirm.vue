<template>
  <el-tooltip
    ref="tooltipRef"
    v-bind="$attrs"
    trigger="click"
    effect="light"
    :popper-class="`${ns.namespace}-popover`"
    :teleported="compatTeleported"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :hide-after="hideAfter"
    :persistent="persistent"
  >
    <template #content>
      <div :class="ns.b()">
        <div :class="ns.e('main')">
          <el-icon v-if="!hideIcon && icon" :class="ns.e('icon')" :style="{ color: iconColor }">
            <component :is="icon" />
          </el-icon>
          {{ title }}
        </div>
        <div :class="ns.e('action')">
          <el-button size="small" :type="cancelButtonType" @click="cancel">
            {{ finalCancelButtonText }}
          </el-button>
          <el-button size="small" :type="confirmButtonType" @click="confirm">
            {{ finalConfirmButtonText }}
          </el-button>
        </div>
      </div>
    </template>
    <template v-if="$slots.reference">
      <slot name="reference" />
    </template>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import ElButton from '@element-ultra/components/button'
import ElIcon from '@element-ultra/components/icon'
import ElTooltip from '@element-ultra/components/tooltip'
import { useDeprecateAppendToBody } from '@element-ultra/components/popper'
import { useNamespace } from '@element-ultra/hooks'
import { popconfirmProps } from './popconfirm'

defineOptions({
  name: 'ElPopconfirm'
})

const props = defineProps(popconfirmProps)

const { compatTeleported } = useDeprecateAppendToBody('ElPopconfirm', 'appendToBody')

const ns = useNamespace('popconfirm')
const tooltipRef = ref<{ onClose: () => void }>()

const hidePopper = () => {
  unref(tooltipRef)?.onClose?.()
}

const handleCallback = () => {
  hidePopper()
}

const confirm = (e: Event) => {
  props.onConfirm?.(e)
  handleCallback()
}
const cancel = (e: Event) => {
  props.onCancel?.(e)
  handleCallback()
}

const finalConfirmButtonText = computed(() => props.confirmButtonText)
const finalCancelButtonText = computed(() => props.cancelButtonText)
</script>
