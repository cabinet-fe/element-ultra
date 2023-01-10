<template>
  <el-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    :icon="InfoFilled"
    icon-color="red"
    title="Are you sure to delete this?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <el-button>Delete</el-button>
    </template>
  </el-popconfirm>
</template>

<script setup lang="ts">
import { InfoFilled } from 'icon-ultra'

const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}
</script>
