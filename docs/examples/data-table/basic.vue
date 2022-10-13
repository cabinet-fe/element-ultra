<template>
  <div class="count">
    <label>数据量</label>
    <el-input-number
      :precision="0"
      v-model="config.count"
      style="width: 200px"
    />

    <label>显示合计</label>
    <el-checkbox v-model="config.showSummary" />

    <label>显示序号</label>
    <el-checkbox v-model="config.showIndex" />

    <label>多选</label>
    <el-checkbox v-model="config.checkable" />

    <label>单选</label>
    <el-checkbox v-model="config.selectable" />

    <label>CPU空闲时调度</label>
    <el-checkbox v-model="config.idle" />
  </div>
  <el-data-table
    :show-index="config.showIndex"
    :checkable="config.checkable"
    :selectable="config.selectable"
    :columns="columns"
    :data="data"
    :idle="config.idle"
    :show-summary="config.showSummary"
    height="500px"
    @check="log"
    @select="log"
  >
    <!-- 表格设置器 -->
    <template #column-conf="{ column }">
      <div class="conf-wrap">
        <el-input
          placeholder="列名称"
          v-if="typeof column.name === 'string'"
          v-model="column.name"
        />
        <el-select
          :options="presetRendererOptions"
          v-model="preset"
          @change="handleChange(column, $event)"
          placeholder="预设渲染"
          clearable
        />
      </div>
    </template>

    <template #test1="{ row }">
      <el-button link type="primary">{{ row.name }}</el-button>
    </template>

    <template #test2="{ row }">
      {{ row.name }}
    </template>
  </el-data-table>
</template>

<script lang="tsx" setup>
import type { DataTableColumn } from '@element-ultra/components'
import { n } from 'fe-dk'
import { computed, shallowReactive, shallowRef } from 'vue'

const log = console.log

const preset = shallowRef<string>()

const presetRendererOptions = [{ label: '金钱', value: 'money' }]

const presetRendererMap: Record<string, DataTableColumn['render']> = {
  money: ({ val }) => {
    return n(val).format('money')
  }
}

const handleChange = (column: DataTableColumn, preset: string) => {
  let render = presetRendererMap[preset]
  if (render) {
    column.render = render
  } else {
    column.render = undefined
  }
}

const columns: DataTableColumn[] = [
  {
    name: () => <span style='color: red'>姓名</span>,
    key: 'name',
    align: 'center',
    width: 80,
    sortable: true
  },
  {
    name: '钱',
    key: 'money'
  },
  {
    name: '测试2',
    key: 'test2',
    children: [
      {
        name: '测试2-1',
        key: 'test2-1',

        children: [
          {
            name: '测试2-1-1',
            key: 'test2-1-1',
            slot: 'test2',
            align: 'center'
          },
          { name: '测试2-1-2', key: 'test2-1-2', slot: 'test2' },
          { name: '测试2-1-3', key: 'test2-1-3', slot: 'test2' }
        ]
      },
      {
        name: '测试2-2',
        key: 'test2-2',
        children: [
          { name: '测试3-1-1', key: 'test3-1-1', slot: 'test2' },
          { name: '测试3-1-2', key: 'test3-1-2', slot: 'test2' },
          { name: '测试3-1-3', key: 'test3-1-3', slot: 'test2' }
        ]
      },
      { name: '测试2-3', key: 'test2-3', slot: 'test2' }
    ]
  },

  { name: '测试1', key: 'test1', slot: 'test1' },

  { name: '测试3', key: 'test3', slot: 'test2', fixed: 'right', width: 100 }
]

const config = shallowReactive({
  count: 3000,
  showSummary: false,
  showIndex: false,
  checkable: false,
  selectable: false,
  idle: false
})

const xings =
  '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章'
const mings = '啊行者三四里华琴浩杰龙晨勉国爱葱飞鹏婷'

const data = computed(() => {
  return Array.from({ length: config.count }).map((_, i) => {
    const xing = xings[~~(Math.random() * xings.length)]
    const ming = mings[~~(Math.random() * mings.length)]
    return {
      name: xing + ming + i,
      id: i,
      money: ~~(Math.random() * 10000)
    }
  })
})
</script>

<script lang="tsx">
export default {
  inheritAttrs: false
}
</script>
<style>
.count {
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
</style>
