<template>
  <el-button
    @click="
      open('create', {
        title: '新增'
      });
      data.node1 = '0-0'
    "
    >新增</el-button
  >

  <el-button @click="handleEdit">编辑</el-button>

  <div>{{ data }}</div>

  <el-form-dialog
    :title="dialog.title"
    v-model="dialog.visible"
    :confirm="confirm"
  >
    <el-button @click="data.rich = '<p><br></p>'">清空富文本</el-button>
    <el-card header="aaa">
      <el-form
        :cols="{ cols: 3, xs: 1, s: 2 }"
        :data="data"
        :rules="rules"
        label-width="80px"
      >
        <el-radio-group field="type" label="类型">
          <el-radio value="1">名称</el-radio>
          <el-radio value="2">学校</el-radio>
        </el-radio-group>

        <el-text-editor span="max" label="富文本" field="rich" />

        <el-input-number field="age" label="年龄"></el-input-number>

        <el-input v-if="data.type === '1'" field="name" label="名称" />
        <el-input
          v-else
          type="password"
          key="2"
          field="school"
          label="学校"
          tips="输入一个学校"
        />

        <el-textarea field="name" label="副文本" span="max"></el-textarea>

        <el-tree-select
          key="111"
          :data="treeData"
          value-key="data.value"
          label-key="data.label"
          children-key="childNodes"
          field="node1"
          label="单选"
        />

        <el-tree-select :data="treeData" field="node2" label="多选" multiple   value-key="data.value"
          label-key="data.label"
          children-key="childNodes"/>

        <el-select :options="treeData" />

        <el-input label="a.a" field="a.a" />
        <el-input label="a.b" field="a.b" />
      </el-form>
    </el-card>
    <!-- <el-card header="bbb">
      <el-form :data="data2" :rules="rules2">
        <el-input label="测试2" field="test" />
      </el-form>
    </el-card> -->
  </el-form-dialog>
</template>

<script setup lang="ts">
import { useFormDialog, useFormModel } from 'element-ultra'

const [data, rules] = useFormModel({
  name: {
    required: true,
    validator(v) {
      if (v && v.length < 2) {
        return new Promise(rs => {
          setTimeout(() => {
            rs('名称长度不能小于3')
          }, 1000)
        })
      }
      return ''
    }
  },
  school: { required: true },
  type: { value: '' },
  age: {},
  node1: {},
  node2: { value: [] as string[] },
  rich: { required: true, value: '' },
  a: {
    value: {},
    children: {
      a: { value: '' },
      b: { value: '' }
    }
  }
})

let treeData = $shallowRef<any[]>([])
setTimeout(() => {
  treeData = Array.from({ length: 10 }).map((_, index) => {
    return {
      data: {
        label: `文本${index}`,
        value: `${index}`
      },
      childNodes: Array.from({ length: Math.ceil(Math.random() * 2) }).map(
        (_, childIndex) => {
          return {
            data: {
              label: `文本${index}-${childIndex}`,
              value: `${index}-${childIndex}`
            }
          }
        }
      )
    }
  })
}, 1000)

const [data2, rules2] = useFormModel({
  test: {}
})

const handleEdit = () => {
  open('update', {
    title: '编辑',
    data: [
      {
        name: '张三',
        type: '2',
        school: '清华',
        age: 1,
        a: { a: '14', b: '23' },
        node2: ['0', '0-0', '1'],
        rich: `<h3><span style="color: rgb(225, 60, 57);">破坏性更改</span></h3><div data-w-e-type="todo"><input type="checkbox" disabled checked>预警事件增加是否需要审批设置, 该改动会影响预警详情</div><h3><span style="color: rgb(64, 169, 255);">新功能</span></h3><div data-w-e-type="todo"><input type="checkbox" disabled checked>新增版本发布模块, 现在可以在应用顶部点击查看版本日志图标查看版本日志</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>上传组件新增扫码上传</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>text-editor组件现在支持定义菜单功能</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>登录页新增标语、版权</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>基础配置里可配标语、版权</div><div data-w-e-type="todo"><input type="checkbox" disabled ><a href="http://47.116.77.104:4050/bug-view-347.html" target="" style="text-align: left;">公务接待报销-人员明细加一个导入功能</a></div><h3><span style="color: rgb(115, 209, 61);">BUG修复</span></h3><h3><span style="color: rgb(146, 84, 222);">优化</span></h3><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化富文本编辑器的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化弹框滚动条的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化了应用基础配置的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>优化了本地个性化配置的样式</div><div data-w-e-type="todo"><input type="checkbox" disabled checked>编码规则增加规则预览</div>`
      },
      {
        test: '33'
      }
    ]
  })
}

const [dialog, open] = useFormDialog([data, data2])

const confirm = () => {}
</script>
