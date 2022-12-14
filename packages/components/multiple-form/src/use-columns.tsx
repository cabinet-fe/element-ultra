import type { TableColumn } from '@element-ultra/components/table'
import { ElButton } from '@element-ultra/components/button'
import { ElTooltip } from '@element-ultra/components/tooltip'
import { ElIcon } from '@element-ultra/components/icon'
import { computed, isVNode, ShallowReactive, Slots } from 'vue'
import type {
  MultipleFormColumn,
  MultipleFormProps,
  MultipleFormRow,
  MultipleFormEmits
} from './type'
import {
  Plus,
  QuestionFilled,
  Edit,
  Delete,
  Select,
  Close
} from '@element-plus/icons-vue'
import type { UseNamespaceReturn } from '@element-ultra/hooks'
import type useRows from './use-rows'

interface Options {
  props: MultipleFormProps
  slots: Slots
  errorTips: ShallowReactive<Record<string, any>>
  ns: UseNamespaceReturn
  root: MultipleFormRow
  /** 插入数据 */
  insertTo: ReturnType<typeof useRows>['insertTo']
  emit: MultipleFormEmits
  delRow: (indexes: number | number[]) => void
  validate: (data: Record<string, any>) => Promise<boolean>
  open: (type: 'create' | 'update', options: any) => void
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
    delRow,
    open,
    validate,
    root,
    insertTo
  } = options

  const renders: Renders = {
    view: ({ val, row }, column) => {
      const viewSlot = slots[column.key + ':view']
      if (column.render) {
        const ret = column.render(val, row.data, row.index)
        if (ret instanceof Object) {
          return isVNode(ret) ? ret : String(ret)
        }
        return ret
      }
      if (viewSlot) {
        return viewSlot({
          row: row.data,
          index: row.index,
          indexes: row.indexes
        })
      }

      return val ? String(val) : null
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

  let currentEditRow: MultipleFormRow | null = null

  /** 重置当前编辑行 */
  const resetCurrentRow = () => {
    if (currentEditRow) {
      // 未经保存的row直接删除
      if (!currentEditRow.saved) {
        delRow(currentEditRow.indexes)
        currentEditRow = null
      } else {
        currentEditRow.status = 'view'
      }
    }
  }

  /**
   * 新增行
   * @param parent 父级
   */
  const createInlineRow = (parent?: MultipleFormRow) => {
    resetCurrentRow()

    const data = (props.columns || []).reduce((acc, cur) => {
      let value = cur.defaultValue
      if (value instanceof Function) {
        value = value()
      }
      acc[cur.key] = value
      return acc
    }, {} as Record<string, any>)

    // 在父级下添加子级
    if (parent) {
      const { children } = parent

      currentEditRow = insertTo(
        [...parent.indexes, children?.length ?? 0],
        data,
        'editing'
      )
    }
    // 在根级添加
    else {
      currentEditRow = insertTo(root.children!.length, data, 'editing')
    }
  }

  /** 新增函数 */
  const handleCreate = () => {
    props.mode === 'inline'
      ? createInlineRow()
      : open('create', {
          ctx: {
            indexes: [root.children!.length]
          }
        })
  }

  /** 保存 */
  const handleSave = async (row: MultipleFormRow) => {
    const valid = await validate(row.data)
    if (!valid) return

    let stopped = false

    if (props.saveMethod) {
      row.loading = true
      const result = props.saveMethod({
        data: row.data,
        rows: root.children!.map(item => item.data),
        parent: row.parent?.data,
        type: !row.saved ? 'create' : 'update',
        index: row.index,
        indexes: row.indexes
      })

      // 异步
      if (result instanceof Promise) {
        const asyncResult = await result.finally(() => {
          row.loading = false
        })
        stopped = asyncResult === false
      } else {
        row.loading = false
        stopped = result === false
      }
    }

    if (stopped) {
      // 设当前编辑的行为空
      currentEditRow = null
      return
    }

    emit(
      'save',
      row.data,
      props.data ?? [],
      !row.saved ? 'create' : 'update',
      row.parent?.data
    )

    row.status = 'view'
    row.saved = true
    // 保存和关闭要将当前编辑的row置空
    currentEditRow = null
  }

  /**
   * 退出编辑
   * @param row
   */
  const handleClose = (row: MultipleFormRow) => {
    if (!row.saved) {
      // 未保存的行删掉
      delRow(row.indexes)
    } else {
      row.status = 'view'
    }

    currentEditRow = null
  }

  /**
   * 编辑
   * @param row 行
   */
  const handleEdit = (row: MultipleFormRow) => {
    if (props.mode === 'dialog') {
      open('update', {
        ctx: {
          indexes: row.indexes
        },
        data: row.data
      })
    } else {
      resetCurrentRow()
      row.status = 'editing'
      currentEditRow = row
    }
  }

  /**
   * 删除行
   * @param row
   */
  const handleDelete = async (row: MultipleFormRow) => {
    if (props.deleteMethod) {
      row.loading = true

      const result = props.deleteMethod({
        data: row.data,
        saved: row.saved,
        index: row.index,
        indexes: row.indexes
      })

      if (result instanceof Promise) {
        const asyncResult = await result.finally(() => {
          row.loading = false
        })

        if (asyncResult === false) return
      } else {
        row.loading = false
        if (result === false) return
      }
    }

    emit('delete', row.data)
    delRow(row.indexes)

    if (row === currentEditRow) {
      currentEditRow = null
    }
  }

  /**
   * 创建子row
   * @param row
   */
  const handleCreateChild = (row: MultipleFormRow) => {
    if (props.mode === 'dialog') {
      open('create', {
        ctx: {
          indexes: [...row.indexes, row.children?.length ?? 0]
        }
      })
    } else {
      createInlineRow(row)
    }
  }

  const cols = computed(() => {
    const { columns, disabled, actionEdit, actionDelete, tree } = props

    // 操作栏
    const actionColumn: TableColumn<MultipleFormRow> = {
      fixed: 'right',
      key: '$_action',
      align: 'center',
      width: props.actionWidth,
      name: () => (
        <>
          <span>操作</span>
          <a class={ns.e('create')} onClick={handleCreate}>
            新增
          </a>
        </>
      ),
      render: ({ row }) => {
        const buttons: JSX.Element[] = []

        // 保存按钮
        row.status === 'editing' &&
          buttons.push(
            <ElButton
              type='primary'
              icon={Select}
              link
              loading={row.loading}
              onClick={() => handleSave(row)}
            />,
            <ElButton
              type='primary'
              icon={Close}
              loading={row.loading}
              link
              onClick={() => handleClose(row)}
            />
          )

        // 编辑
        if (row.status === 'view') {
          actionEdit &&
            buttons.push(
              <ElButton
                type='primary'
                icon={Edit}
                link
                loading={row.loading}
                onClick={() => handleEdit(row)}
              />
            )

          // 新增子级
          tree &&
            buttons.push(
              <ElButton
                type='primary'
                link
                loading={row.loading}
                icon={Plus}
                onClick={() => handleCreateChild(row)}
              />
            )
        }

        // 删除按钮
        actionDelete &&
          buttons.push(
            <ElButton
              type='primary'
              icon={Delete}
              link
              loading={row.loading}
              onClick={() => handleDelete(row)}
            />
          )

        const actionInViewMode = slots['action:view-mode']?.({
          row: row.data,
          index: row.index,
          indexes: row.indexes
        })

        const actionInEditMode = slots['action:edit-mode']?.({
          row: row.data,
          index: row.index,
          indexes: row.indexes
        })
        return (
          <>
            {actionInViewMode}
            {actionInEditMode}
            {buttons}
          </>
        )
      }
    }

    // 索引列
    const indexColumn: TableColumn<MultipleFormRow> = {
      name: '#',
      key: '$_index',
      align: 'center',
      fixed: 'left',
      width: 60,
      render: ({ row }) => row.index + 1
    }

    if (tree) {
      indexColumn.align = 'left'
      indexColumn.width = 120
      indexColumn.render = ({ row }) => {
        return (
          <>
            <i
              class={ns.e('index-line')}
              style={{
                width: row.depth * 18 + 'px'
              }}
            ></i>

            <span> {row.index + 1}</span>
          </>
        )
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

    return [
      indexColumn,
      ...(disabled ? tableColumns : tableColumns.concat(actionColumn))
    ]
  })

  return cols
}