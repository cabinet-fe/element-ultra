<template>
  <div>
    <el-input v-model="input1" placeholder="Please input">
      <template #prepend>Http://</template>
    </el-input>
  </div>
  <div class="mt-4">
    <el-input v-model="input2" placeholder="Please input">
      <template #append>.com</template>
    </el-input>
  </div>
  <div class="mt-4">
    <el-input
      v-model="input3"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <el-select
          v-model="select"
          :options="[
            { label: 'Restaurant', value: '1' },
            { label: 'Order No.', value: '2' },
            { label: 'Tel', value: '3' },
          ]"
          style="width: 110px"
        />
      </template>
      <template #append>
        <el-button :icon="Search"></el-button>
      </template>
    </el-input>
  </div>
  <div class="mt-4">
    <el-input
      v-model="input3"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <el-button :icon="Search"></el-button>
      </template>
      <template #append>
        <el-select
          v-model="select"
          placeholder="Select"
          style="width: 110px"
          :options="[
            { label: 'Restaurant', value: '1' },
            { label: 'Order No.', value: '2' },
            { label: 'Tel', value: '3' },
          ]"
        />
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search } from 'icon-ultra'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const select = ref('')
</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
