<template>
  <el-grid :cols="['200px', '1fr']">
    <div>
      <el-tree
        :data="data"
        style="width: 300px"
        highlight-current
        :height="1000"
        :item-size="32"
        show-checkbox
        ref="treeRef"
        check-strictly
        :props="{
          label: 'data.label'
        }"
      >
      </el-tree>
    </div>

    <div></div>
  </el-grid>
</template>

<script setup lang="ts">
import type { ElTree } from '@element-ultra/components'

let data = $shallowRef<any[]>([])

const treeRef = $shallowRef<InstanceType<typeof ElTree>>()

setTimeout(() => {
  data = Array.from({ length: 100 }).map((_, index) => {
    return {
      label: `文本${index}`,
      data: { label: '文本' },
      value: `${index}`,
      children: Array.from({ length: Math.round(Math.random() * 10) }).map(
        (_, childIndex) => {
          return {
            label: `子文本${childIndex}`,
            data: { label: '子文本' },
            value: `${index}-${childIndex}`
          }
        }
      )
    }
  })

  setTimeout(() => {
    treeRef?.setCheckedKeys([
    '0',
    '1',
    // '0-0',
    // '0-1',
    // '0-2',
    // '0-3',
    // '0-4',
    // '0-5',
    // '1-0'
  ])
  })
}, 500)
</script>
