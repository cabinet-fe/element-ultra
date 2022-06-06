<template>
  <el-page>
    <div>
      <div  key="cc">{{active}}</div>
      <button @click="active = 'a'">a</button>
      <br/>
      <button @click="active = 'b'">b</button>
    </div>


    <!-- 额外的tab页 -->
    <template #panes>
      <el-tab-pane name="测试" label="test"> 111 </el-tab-pane>
    </template>

    <template #footer="{ extraRefs }">
    111
      <el-button @click="c.log(extraRefs)">获取实例</el-button>
    </template>

    <el-card header="你好">
      <el-form>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
      </el-form>
    </el-card>

    <el-card header="我是">
      <el-form>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
      </el-form>
    </el-card>

    <el-card header="一个">
      <el-form>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
      </el-form>
    </el-card>

    <el-card header="前端">
      <el-form>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
      </el-form>
    </el-card>

    <el-card header="组件">
      <el-form>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
        <el-input></el-input>
      </el-form>
    </el-card>
  </el-page>
</template>

<script setup lang="ts">
const active = $shallowRef('a')
</script>

<style lang="scss"></style>
