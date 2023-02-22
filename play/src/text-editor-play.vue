<template>
  <el-button @click="updateContent">更新内容</el-button>
  <el-text-editor style="margin: 8px" v-model="a" mode="simple" :include="[
    'todo', 'bulletedList', 'numberedList', 'insertLink', '|', 'undo', 'redo', 'fullScreen'
  ]"  :disabled="false" />
  {{a}}
</template>

<script setup lang="ts">

let a = $shallowRef('<h3><span style="color: rgb(225, 60, 57);">破坏性更改</span></h3><div data-w-e-type="todo"><input type="checkbox" disabled checked>预警事件增加是否需要审批设置, 该改动会影响预警详情</div><h3><span style="color: rgb(64, 169, 255);">新功能</span></h3><div data-w-e-type="todo"><input type="checkbox" disabled checked>新增版本发布模块, 现在可以在应用顶部点击查看版本日志图标查看版本日志</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>上传组件新增扫码上传</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>text-editor组件现在支持定义菜单功能</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>登录页新增标语、版权</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>基础配置里可配标语、版权</div><div data-w-e-type="todo"><input type="checkbox" disabled ><a href="http://47.116.77.104:4050/bug-view-347.html" target="" style="text-align: left;">公务接待报销-人员明细加一个导入功能</a></div><h3><span style="color: rgb(115, 209, 61);">BUG修复</span></h3><h3><span style="color: rgb(146, 84, 222);">优化</span></h3><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化富文本编辑器的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化弹框滚动条的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化了应用基础配置的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化了本地个性化配置的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>编码规则增加规则预览</div>')

const updateContent = () => {
  a = `<p>${Math.random()}</p>`
}
</script>
