<template>
 <el-checkbox v-model="checked">是否选中</el-checkbox>
 <el-checkbox :checked="checked" />
 <el-checkbox-button v-model="checked">是否选中</el-checkbox-button>

 <el-checkbox-group v-model="multipleChecked">
   <el-checkbox value="1">一</el-checkbox>
   <el-checkbox value="2">二</el-checkbox>
   <el-checkbox value="3">三</el-checkbox>
 </el-checkbox-group>

 <el-checkbox-group v-model="multipleChecked">
   <el-checkbox-button value="1">一</el-checkbox-button>
   <el-checkbox-button value="2">二</el-checkbox-button>
   <el-checkbox-button value="3">三</el-checkbox-button>
 </el-checkbox-group>
</template>

<script lang="ts" setup>
let checked = $shallowRef(false)

const multipleChecked= $shallowRef(['1'])
</script>

<style lang="scss" scoped>

</style>