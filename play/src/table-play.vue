<template>
  <el-table :data="data">
    <el-table-column type="index"></el-table-column>

    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="序号" type="index"></el-table-column>
    <el-table-column :width="120" name="测试1" fixed="left">
      <el-table-column name="测试1-1" fixed="left" prop="name"></el-table-column>
      <el-table-column name="测试1-2"></el-table-column>
    </el-table-column>
    <el-table-column prop="name" fixed="left"></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { shallowRef } from 'vue'


const count = shallowRef(30)

const xings =
  '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章'
const mings = '啊行者三四里华琴浩杰龙晨勉国爱葱飞鹏婷'

const data = computed(() => {
  return Array.from({ length: count.value }).map((_, i) => {
    const xing = xings[~~(Math.random() * xings.length)]
    const ming = mings[~~(Math.random() * mings.length)]
    return {
      name: xing + ming + i,
      id: i
    }
  })
})
</script>

<style>
.flex {
  display: flex;
  justify-content: flex-start;
  width: 200px;
  box-sizing: border-box;
  /* padding: 20px; */
  border: 1px solid #ccc;
}

.flex div {
  height: 20px;
  background-color: #ccc;
}
</style>