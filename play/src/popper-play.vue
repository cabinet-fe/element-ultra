<template>
  <div>
    虚拟pop

    <el-button :ref="getButtonRef" @click="onClick(i)" v-for="i of 5">测试{{ i }}</el-button>

    <el-popover trigger="click" virtual-triggering :virtual-ref="virtualRef">
      这是全局唯一的
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUpdate, shallowRef } from 'vue'

let virtualRef = $shallowRef<any>()

function useRefs<T = any>() {
  let refs = $shallowRef<T[]>([])
  const getRef = (r: T) => {
    refs.push(r)
  }
  onBeforeUpdate(() => {
    refs = []
  })
  return [refs, getRef] as const
}

const [buttonRefs, getButtonRef] = useRefs()

function onClick(i: number) {
  virtualRef = buttonRefs[i - 1].$el
}
</script>
