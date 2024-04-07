<template>
  <el-pro-table
    height="100%"
    pagination
    row-key="id"
    :api="api"
    :query="query"
    cache-params
    :columns="columns"
    show-index
    checkable
    ref="tableRef"
    item-reactive
    v-model:checked="checked"
    :lazy-load="lazyLoad"
    :summary-method="summaryMethod"
    show-summary
    tree
  >
    <template #extra-bar>
      {{ query }}
    </template>

    <template #searcher>
      <el-range v-model="query.$range" />
    </template>

    <template #column-conf="{ column }">
      <el-input
        v-if="typeof column.name !== 'function'"
        v-model="column.name"
      />
      <el-input placeholder="插槽" v-model="column.slot" />
      <el-select
        placeholder="使得"
        :options="presets"
        v-model="column.preset"
        @update:model-value="handleChangePreset(column, $event)"
      />
    </template>

    <template #age="{ row }">
      {{ row }}
    </template>

    <template #action>
      <el-action-group>
        <el-action>编辑</el-action>
        <el-action>删除</el-action>
      </el-action-group>
    </template>

    <template #tools>
      <el-button type="primary" @click="createSearcher">新增</el-button>
      <el-button @click="c.log(columns)">打印列数据</el-button>
      <el-button @click="handleClick">改变query</el-button>
      <el-button @click="handleFix">固定列</el-button>
      <el-button @click="replace">替换路由</el-button>
      <el-button @click="checked = []">清空选择</el-button>
      <el-dropdown trigger="click" split-button type="primary">
        按钮123
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 13</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-pro-table>
</template>

<script setup lang="tsx">
import { ElButton, ProTableColumn } from 'element-ultra'
import { n } from 'cat-kit'
import { isReactive, provide, shallowReactive, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

provide('aa', { name: 'aa' })

const showTools = shallowRef(false)

const lazyLoad = async () => {
  await new Promise((rs, rj) => {
    setTimeout(() => {
      rs(0)
    }, 1000)
  })
  return [
    { name: '你好' + '-1-1', money: 666, id: '-1-1' },
    { name: '你好' + '-1-2', money: 666, id: '-1-2' },
    { name: '你好' + '-1-3', money: 666, id: '-1-3' }
  ]
}

setTimeout(() => {
  showTools.value = true
}, 1000)

// 查询
const query = shallowRef(
  shallowReactive({
    name: '',
    $date: ['2022-02-14', '2022-08-03'],
    $s: undefined,
    $range: undefined
  })
)

const summaryMethod = ({ checked, columns, data }) => {
  return ['合计'].concat(
    columns.slice(1).map(column => {
      if (column.key !== 'money') return ''
      let n = 0
      ~(checked.size ? checked : data).forEach(item => {
        n += item[column.key]
      })
      return n || ''
    })
  )
}

const tableRef = shallowRef()

const router = useRouter()
const route = useRoute()
const replace = () => {
  router.replace(route.fullPath + `?t=${Date.now()}`)
}
const presets = [{ label: '金钱', value: 'money' }]
const presetRenders: Record<string, ProTableColumn['render']> = {
  money: ({ val }) => n(val).format('money', 2)
}

const handleChangePreset = (column: ProTableColumn, preset: string) => {
  let render = presetRenders[preset]
  if (render) {
    column.render = render
  } else {
    column.render = ({ val }) => val
  }
}

const reactiveColumnItem = (columns: any[]) => {
  let ret: any[] = []
  columns.forEach(column => {
    let item = isReactive(column) ? column : shallowReactive(column)
    if (column.children) {
      item.children = reactiveColumnItem(column.children)
    }
    ret.push(item)
  })
  return ret
}

let checked = shallowRef([])

const dynColumns = shallowRef<ProTableColumn[]>([
  {
    name: '钱',
    key: 'money',
    sortable: true,
    width: 100,
    preset: 'money',
    align: 'center'
  },
  {
    name: '姓名',
    key: 'name1',
    slot: 'name',
    sortable: true
  },
  {
    name: '姓名2',
    key: 'name2'
  },
  {
    name: '姓名',
    key: 'name3'
  },
  {
    name: '姓名',
    key: 'name4'
  },
  {
    name: '姓名',
    key: 'name5'
  },
  {
    name: '姓名',
    key: 'name6'
  },
  {
    name: '姓名',
    key: 'name7'
  },
  {
    name: '操作',
    align: 'center',
    key: 'action',
    fixed: 'right',
    width: 150,
    slot: 'action'
  }
])

let columns = shallowRef<ProTableColumn[]>([])

setTimeout(() => {
  const _columns = reactiveColumnItem([
    {
      name: '姓名',
      key: 'name11'
      // children: [
      //   { name: 'child', key: 'money', preset: 'money' },
      //   {
      //     name: 'child2',
      //     key: 'name',
      //     render({ val }) {
      //       return val
      //     }
      //   }
      // ]
    },
    ...dynColumns.value
  ] as ProTableColumn[])
  _columns.forEach(column => {
    column.preset && handleChangePreset(column, column.preset)
  })

  columns.value = _columns
}, 100)

const handleFix = () => {
  const column = columns.value[1]
  if (column.fixed === 'left') {
    column.fixed = 'right'
  } else if (column.fixed === 'right') {
    delete column.fixed
  } else {
    column.fixed = 'left'
  }
}

const api = shallowRef('/some')

// setTimeout(() => {
//   api.value = '/some/test2'
// }, 1000)

const list = shallowRef<any[]>([])
const createSearcher = () => {
  list.value = [...list.value, { label: '测试' }]
}

// setTimeout(() => {
//   api.value = '/some/test'
// }, 1500)

const handleClick = () => {
  query.value = shallowReactive({
    name: '',
    $date: []
  })
}
</script>
