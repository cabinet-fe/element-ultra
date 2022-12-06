import type { TableColumn } from '@element-ultra/components/table'
import { ElButton } from '@element-ultra/components/button'
import { ElTooltip } from '@element-ultra/components/tooltip'
import { ElIcon } from '@element-ultra/components/icon'
import { computed, ShallowReactive, Slots } from 'vue'
import type {
  MultipleFormColumn,
  MultipleFormProps,
  MultipleFormRow,
  MultipleFormEmits
} from './multiple-form'
import {
  Plus,
  QuestionFilled,
  Edit,
  Delete,
  Select,
  Close
} from '@element-plus/icons-vue'
import type { UseNamespaceReturn } from '@element-ultra/hooks'

interface Options {
  props: MultipleFormProps
  emit: MultipleFormEmits
  slots: Slots
  errorTips: ShallowReactive<Record<string, any>>
  handleCreateRow: (parent?: MultipleFormRow) => void
  delRow: (indexes: number | number[]) => void
  validate: (data: Record<string, any>) => Promise<boolean>
  ns: UseNamespaceReturn
  open: (type: 'create' | 'update', options: any) => void
  root: MultipleFormRow
}

type Renders = Record<
  MultipleFormRow['status'],
  (
    params: { row: MultipleFormRow; val: any },
    column: MultipleFormColumn
  ) => any
>

export default function useColumns(options: Options) {
  const {
    props,
    errorTips,
    slots,
    ns,
    emit,
    handleCreateRow,
    delRow,
    validate,
    open,
    root
  } = options

  const renders: Renders = {
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
    const { columns, disabled, actionCreate, actionEdit, actionDelete, mode } =
      props

    const actionColumn: TableColumn<MultipleFormRow> = {
      fixed: 'right',
      key: '$_action',
      align: 'center',
      width: props.actionWidth,
      name: () => (
        <>
          <span>操作</span>
          <a
            class={ns.e('create')}
            onClick={() => {
              handleCreateRow()

            }}
          >
            新增
          </a>
        </>
      ),
      render: ({ row }) => {
        const buttons: JSX.Element[] = []

        row.status === 'editing' &&
          buttons.push(
            <ElButton
              type='primary'
              icon={Select}
              link
              onClick={async () => {
                const valid = await validate(row.data)
                if (!valid) return
                emit('save', row.data, props.data ?? [])
                row.status = 'view'
              }}
            />,
            <ElButton
              type='primary'
              icon={Close}
              link
              onClick={() => {
                row.status = 'view'
              }}
            />
          )

        // 编辑按钮
        row.status === 'view' &&
          actionEdit &&
          buttons.push(
            <ElButton
              type='primary'
              icon={Edit}
              link
              onClick={() => {
                if (props.mode === 'dialog') {
                  // open('update', {
                  //   ctx: {
                  //     indexes: row.indexes
                  //   }
                  // })
                } else {
                  row.status = 'editing'
                }
              }}
            />
          )

        // 删除按钮
        actionDelete &&
          buttons.push(
            <ElButton
              type='primary'
              icon={Delete}
              link
              onClick={() => delRow(row.indexes)}
            />
          )

        actionCreate &&
          props.tree &&
          props.mode !== 'custom' &&
          buttons.push(
            <ElButton
              type='primary'
              icon={Plus}
              link
              onClick={() => handleCreateRow(row)}
            />
          )

        return <>{buttons}</>
      }
    }

    const tableColumns: TableColumn<MultipleFormRow>[] = columns!
      .filter(column => column.visible !== false)
      .map(column => {
        const errTip = errorTips[column.key]
        const required = !!column.rules?.required

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
          <span
            class={[ns.is('required', required)]}
            style='vertical-align: middle'
          >
            {column.name}
          </span>
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
