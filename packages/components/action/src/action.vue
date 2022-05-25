<template>
  <el-popconfirm
    v-if="needConfirm"
    append-to="body"
    teleported
    title="确认执行此操作吗？"
    @confirm="run"
    placement="right-start"
  >
    <template #reference>
      <li :class="ns.b()" v-if="isDrop">
        <slot />
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
import { actionProps } from './type'
import ElButton from '@element-ultra/components/button'
import ElPopconfirm from '@element-ultra/components/popconfirm'
import { useNamespace } from '@element-ultra/hooks'

const ns = useNamespace('action')

defineOptions({
  name: 'ElAction'
})

defineProps(actionProps)

const emit = defineEmits<{
  (e: 'run'): void
}>()

const run = () => {
  emit('run')
}
</script>
