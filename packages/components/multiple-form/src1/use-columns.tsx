import type { TableColumn } from '@element-ultra/components/table'
import { ElButton } from '@element-ultra/components/button'
import { ElTooltip } from '@element-ultra/components/tooltip'
import { ElIcon } from '@element-ultra/components/icon'
import { computed, ShallowReactive, Slots } from 'vue'
import type {
  MultipleFormColumn,
  MultipleFormProps,
  MultipleFormRow
} from './multiple-form'
import {
  Plus,
  QuestionFilled,
  Edit,
  Delete,
  Close
} from '@element-plus/icons-vue'
import type { UseNamespaceReturn } from '@element-ultra/hooks'

interface Options {
  props: MultipleFormProps
  slots: Slots
  errorTips: ShallowReactive<Record<string, any>>
  handleCreateRow: (parent?: MultipleFormRow) => void
  handleDeleteRow: (row: MultipleFormRow) => void
  ns: UseNamespaceReturn
}

export default function useColumns(options: Options) {
  const { props, handleCreateRow, handleDeleteRow, errorTips, slots, ns } =
    options

  const renders: Record<
    MultipleFormRow['status'],
    (
      params: { row: MultipleFormRow; val: any },
      column: MultipleFormColumn
    ) => any
  > = {
    view: ({ val, row }, column) => {
      const viewSlot = slots[column.key + ':view']
      return column.render
        ? column.render(val, row.data, row.index)
        : viewSlot
        ? viewSlot!({
            row: row.data,
            index: row.index,
            indexes: row.indexes
          })
        : val
    },

    editing: ({ val, row }, column) => {
      const slot = slots[column.key]
      return slot
        ? slot({
            row: row.data,
            val,
            index: row.index,
            indexes: row.indexes
          })
        : val
    }
  }

  const tableColumns = computed(() => {
    const { columns, disabled, actionCreate, actionEdit, actionDelete } = props

    const actionColumn: TableColumn<MultipleFormRow> = {
      fixed: 'right',
      key: '$_action',
      align: 'center',
      width: props.actionWidth,
      name: () => (
        <>
          <span>操作</span>
          <a class={ns.e('create')} onClick={() => handleCreateRow()}>
            新增
          </a>
        </>
      ),
      render: ({ row }) => {
        const content: JSX.Element[] = []

        // 编辑状态
        if (row.status === 'editing') {
          content.push(
            <ElButton type='primary' icon={Close} link onClick={() => {}} />
          )
        }
        // 查看状态
        else if (row.status === 'view') {
          actionEdit &&
            content.push(
              <ElButton
                type='primary'
                icon={Edit}
                link
                onClick={() => row.status === 'editing'}
              />
            )
        }

        actionDelete &&
          content.push(
            <ElButton
              type='primary'
              icon={Delete}
              link
              onClick={() => handleDeleteRow(row)}
            />
          )

        actionCreate &&
          props.tree &&
          props.mode !== 'custom' &&
          content.push(
            <ElButton
              type='primary'
              icon={Plus}
              link
              onClick={() => handleCreateRow(row)}
            />
          )

        return content
      }
    }

    const tableColumns: TableColumn<MultipleFormRow>[] = columns!
      .filter(column => column.visible !== false)
      .map(column => {
        const errTip = errorTips[column.key]
        const content = errTip ? (
          <ElTooltip
            placement='top'
            visible
            effect='dark'
            content={errTip}
            raw-content
          >
            <span style='color: #f00; vertical-align: middle'>
              {column.name}
            </span>
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
          name: () => (
            <>
              {content}
              {tip}
            </>
          ),
          width: column.width,
          align: column.align,
          key: 'data.' + column.key, // data.key才是真实数据
          render: ctx => renders[ctx.row.status](ctx, column),
          summary: column.summary
        }
      })

    return disabled ? tableColumns : tableColumns.concat(actionColumn)
  })

  return {
    tableColumns
  }
}
