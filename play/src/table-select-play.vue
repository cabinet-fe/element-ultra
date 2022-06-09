<template>
  <el-checkbox v-model="multiple">多选</el-checkbox>

  <el-table-select
    v-model="multipleData"
    :columns="columns"
    :data="tableData"
    :multiple="multiple"
    pagination
    :show-index="true"
    :query="query"
    api="aa"
    :dialog-title="dialogTitle"
    ref="tableRef"
    :editable="true"
    :table="true"
    :path="path"
    value-key="code"
    @update:model-value="handleChange"
    :column-filter="columnFilter"
  >
    <el-button type="primary" :icon="Plus">自定义按钮</el-button>

    <template #searcher>
      <el-tree-select v-model="query.name" :data="[]"></el-tree-select>
      <el-tree-select v-model="query.name" :data="[]"></el-tree-select>
      <el-tree-select v-model="query.name" :data="[]"></el-tree-select>
      <!-- <el-input v-model="query.name" /> -->
      <el-date-picker v-model="query.$date" clearable />
    </template>
  </el-table-select>
</template>

<script lang="ts" setup>
import { shallowReactive, onMounted } from 'vue'
import { type TableSelectColumn, useConfig } from 'element-ultra'
import { Plus } from '@element-plus/icons-vue'

const query = shallowReactive({
  name: '',
  $date: ''
})

const columnFilter = (column: TableSelectColumn) => {
 return !['remarks', 'department', 'status'].includes(column.key)
}

const fixed_columns: TableSelectColumn[] = [
  {
    key: 'code',
    name: '明细指标编码',
    width: 160,
    render: (_, __, v) => {
      return v?.substring(0, 8) || null
    }
  },
  { key: 'summary', name: '摘要' },
  { key: 'project', name: '项目' },
  {
    key: 'status',
    name: '状态'
  },
  { key: 'remarks', name: '备注' },
  { key: 'department', name: '部门', width: 160 }
]

let extra_columns: TableSelectColumn[] = $ref([])

let columns = $computed<TableSelectColumn[]>(() => {
  return [...fixed_columns, ...extra_columns]
})

let singleData = $ref({})

let multipleData = $ref([{
  amount: 100,
  balance: 0,
  budgetType: null,
  capitalNature: null,
  capitalNatureName: null,
  capitalSource: null,
  capitalSourceName: null,
  classOrgCode: '5102',
  code: 2 + '',
  createTime: '2022-04-28 16:31:05',
  creator: 'cl',
  custom1: null,
  custom2: null,
  custom3: null,
  custom4: null,
  dataSource: 'local',
  deleted: false,
  department: '81771899 娄葑街道徐家浜社区居民委员会',
  departmentEconomics: null,
  departmentEconomicsName: null,
  deptId: '1427508719440236545',
  deptOrgCode: '817718-81771899',
  expendItems: '5201 投资收益',
  frozenAmount: 0,
  functionalSubjects: '外交支出',
  functionalSubjectsName: '外交支出',
  fundsType: '0101 人员经费',
  fundsTypeName: null,
  governmentEconomics: null,
  governmentEconomicsName: null,
  id: '1519595040521015296',
  latestAmount: 0,
  modifier: 'cl',
  modifyTime: '2022-05-07 14:39:09',
  orgCode: '817718-81771899',
  parentId: '-1',
  paymentMethod: '直接支付',
  paymentMethodName: null,
  personalContacts: null,
  planId: '1519233722672697344',
  planLevel: 'first',
  project: '534535345345',
  projectClassification: null,
  projectClassificationName: null,
  projectName: null,
  quotaProject: '534535345345',
  quotaSource: null,
  quotaSourceName: null,
  quotaSymbol: null,
  remarks: 'test',
  reviewStatus: 'checked',
  settlementMethod: null,
  settlementMethodName: null,
  status: 'enable',
  summary: 'test',
  used: false,
  years: null
}])

let multiple = $ref<boolean>(true)

const tableData = Array.from({ length: 20 }).map((item, index) => ({
  amount: 100,
  balance: 0,
  budgetType: null,
  capitalNature: null,
  capitalNatureName: null,
  capitalSource: null,
  capitalSourceName: null,
  classOrgCode: '5102',
  code: index + '',
  createTime: '2022-04-28 16:31:05',
  creator: 'cl',
  custom1: null,
  custom2: null,
  custom3: null,
  custom4: null,
  dataSource: 'local',
  deleted: false,
  department: '81771899 娄葑街道徐家浜社区居民委员会',
  departmentEconomics: null,
  departmentEconomicsName: null,
  deptId: '1427508719440236545',
  deptOrgCode: '817718-81771899',
  expendItems: '5201 投资收益',
  frozenAmount: 0,
  functionalSubjects: '外交支出',
  functionalSubjectsName: '外交支出',
  fundsType: '0101 人员经费',
  fundsTypeName: null,
  governmentEconomics: null,
  governmentEconomicsName: null,
  id: '1519595040521015296',
  latestAmount: 0,
  modifier: 'cl',
  modifyTime: '2022-05-07 14:39:09',
  orgCode: '817718-81771899',
  parentId: '-1',
  paymentMethod: '直接支付',
  paymentMethodName: null,
  personalContacts: null,
  planId: '1519233722672697344',
  planLevel: 'first',
  project: '534535345345',
  projectClassification: null,
  projectClassificationName: null,
  projectName: null,
  quotaProject: '534535345345',
  quotaSource: null,
  quotaSourceName: null,
  quotaSymbol: null,
  remarks: 'test',
  reviewStatus: 'checked',
  settlementMethod: null,
  settlementMethodName: null,
  status: 'enable',
  summary: 'test',
  used: false,
  years: null
}))

let path = $ref('')

const handleChange = (data: any) => {
  path = '/page-play'
}

let dialogTitle = 'title'

const [, setConfigStore] = useConfig()
setConfigStore({
  tableSelectRequestMethod: () => {
    let data: any[] = []
    return Promise.resolve({
      data,
      total: 100
    })
  }
})

onMounted(() => {
  setTimeout(() => {
    dialogTitle = 'aaaaaaaaaa'
    extra_columns = [
      {
        key: 'frozenAmount',
        name: '当前已冻结金额(元)',
        width: 150
      },
      {
        key: 'balance',
        name: '可冻结金额(元)',
        width: 130
      },
      {
        key: 'newForzenAmount',
        name: '本次冻结金额(元)',
        width: 140
      },
      { key: 'frozenRemark', name: '冻结备注' }
    ]
  }, 3000)
})
</script>
