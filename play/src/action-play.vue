<template>
   <SlotTest>
    <template #test>
      <p v-for="item of list">111</p>
    </template>

  </SlotTest>
  <el-button @click="handleCreate">新增</el-button>

  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <ActionComp>
    <el-action @run="c.log('编辑')" need-confirm>编辑</el-action>
  </ActionComp>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
  <p>111</p>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { ActionComp } from './components/action-play'
import SlotTest from './components/slot-test.vue'
const list = shallowRef<any[]>([])

const handleCreate = () => {
  list.value = [...list.value, 1]
}
</script>
