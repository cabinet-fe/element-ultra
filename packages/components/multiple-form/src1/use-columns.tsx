import type { TableColumn } from '@element-ultra/components/table'
import { ElButton } from '@element-ultra/components/button'
import { ElTooltip } from '@element-ultra/components/tooltip'
import { ElIcon } from '@element-ultra/components/icon'
import { computed, ShallowReactive } from 'vue'
import type { MultipleFormProps } from './multiple-form'
import { Plus, QuestionFilled } from '@element-plus/icons-vue'

interface Options {
  props: MultipleFormProps
  handleCreateRow: () => void
  errorTips: ShallowReactive<Record<string, any>>
}

export default function useColumns(options: Options) {
  const { props, handleCreateRow, errorTips } = options

  const tableColumns = computed(() => {
    const { columns, disabled } = props

    const actionColumn: TableColumn = {
      fixed: 'right',
      key: '$_action',
      align: 'center',
      width: props.actionWidth,
      name: () => (
        <>
          <span style='vertical-align: middle'>操作</span>
          <ElButton
            type='primary'
            style='margin-left: 4px'
            link
            icon={Plus}
            onClick={handleCreateRow}
          >
            新增
          </ElButton>
        </>
      )
    }

    const tableColumns: TableColumn[] = columns!.map(column => {
      const errTip = errorTips[column.key]
      const content = errTip ? (
        <ElTooltip
          placement='top'
          visible
          effect='dark'
          content={errTip}
          raw-content
        >
          <span style='color: #f00; vertical-align: middle'>{column.name}</span>
        </ElTooltip>
      ) : (
        <span style='vertical-align: middle'>{column.name}</span>
      )

      const tip = column.tips ? (
        <ElTooltip effect='dark' content={column.tips} raw-content>
          <ElIcon style='vertical-align: middle'>
            <QuestionFilled />
          </ElIcon>
        </ElTooltip>
      ) : null

      return {
        width: column.width,
        align: column.align,
        key: column.key,
        name: () => (
          <>
            {content}
            {tip}
          </>
        ),
        summary: column.summary
      }
    })

    return disabled ? tableColumns : tableColumns.concat(actionColumn)
  })

  return {
    tableColumns
  }
}
