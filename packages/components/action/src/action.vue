<template>
  <el-popconfirm
    v-if="needConfirm"
    trigger="click"
    title="确认执行此操作吗？"
    @confirm="run"
    @change="handleVisibleChange"
    placement="right-start"
  >
    <template #reference>
      <li :class="ns.b()" v-if="isDrop">
        <div>
          <slot />
        </div>
      </li>

      <el-button v-else :icon="icon" :size="size" text> <slot /> </el-button>
    </template>
  </el-popconfirm>

  <template v-else>
    <li :class="ns.b()" v-if="isDrop" @click="run">
      <slot />
    </li>
    <el-button :icon="icon" v-else :size="size" text @click="run">
      <slot />
    </el-button>
  </template>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { actionProps } from './type'
import ElButton from '@element-ultra/components/button'
import ElPopconfirm from '@element-ultra/components/popconfirm'
import { useNamespace } from '@element-ultra/hooks'
import { actionGroupToken } from './token'

const ns = useNamespace('action')

defineOptions({
  name: 'ElAction'
})

const props = defineProps(actionProps)

const emit = defineEmits<{
  (e: 'run'): void
}>()

const run = () => {
  emit('run')
}

const { setDropdownVisible } = inject(actionGroupToken)!

/** 当 当前的的action处于下拉框中时要在确认框显示或隐藏时联动更多下拉框 */
const handleVisibleChange = (visible: boolean) => {
  props.isDrop && setDropdownVisible(visible)
}
</script>
