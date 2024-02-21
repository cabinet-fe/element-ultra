import type { ElTable, TableColumn } from '@element-ultra/components/table'
import { ElButton } from '@element-ultra/components/button'
import { ElTooltip } from '@element-ultra/components/tooltip'
import { ElIcon } from '@element-ultra/components/icon'
import { dialogInjectionKey } from '@element-ultra/components/dialog/src/token'
import {
  computed,
  isVNode,
  ShallowReactive,
  Slots,
  ShallowRef,
  onMounted,
  onBeforeUnmount,
  watch
} from 'vue'
import type {
  MultipleFormProps,
  MultipleFormRow,
  MultipleFormEmits,
  ActionType
} from './type'
import {
  Insert,
  InfoFilled,
  Edit,
  Delete,
  Select,
  Close,
  Rank,
  AddChild
} from 'icon-ultra'
import type { UseNamespaceReturn } from '@element-ultra/hooks'
import type useRows from './use-rows'
import Sortable from 'sortablejs'
import { nextTick, inject } from 'vue'

interface Options {
  props: MultipleFormProps
  slots: Slots
  errorTips: ShallowReactive<Record<string, any>>
  ns: UseNamespaceReturn
  root: MultipleFormRow
  tableRef: ShallowRef<InstanceType<typeof ElTable> | undefined>
  /** 插入数据 */
  insertTo: ReturnType<typeof useRows>['insertTo']
  emit: MultipleFormEmits
  delRow: (indexes: number | number[]) => void
  validate: (row: MultipleFormRow) => Promise<boolean>
  open: (type: 'create' | 'update', options: any) => void
  emitChange: () => void
}

export default function useColumns(options: Options) {
  const {
    props,
    errorTips,
    slots,
    ns,
    root,
    tableRef,
    emit,
    delRow,
    open,
    validate,
    insertTo,
    emitChange
  } = options

  const sortable = computed(() => {
    return props.sortable && !props.tree
  })

  const exchange = (arr: any[], oIndex: number, nIndex: number) => {
    if (oIndex < nIndex) {
      return [
        ...arr.slice(0, oIndex),
        ...arr.slice(oIndex + 1, nIndex + 1),
        arr[oIndex],

        ...arr.slice(nIndex + 1)
      ]
    } else {
      return [
        ...arr.slice(0, nIndex),
        arr[oIndex],
        ...arr.slice(nIndex, oIndex),
        ...arr.slice(oIndex + 1)
      ]
    }
  }

  const sort = () => {
    if (!sortable.value) return
    stopSort()

    const tbody =
      tableRef.value?.tableDom?.getElementsByClassName('el-table__body')?.[0]
    if (!tbody) return
    sortInstance = new Sortable(tbody as HTMLElement, {
      animation: 150,
      ghostClass: 'el-multiple-form__sort-ghost',
      handle: '.el-multiple-form__sort-handle',

      onSort(e) {
        const { oldIndex, newIndex } = e
        if (oldIndex === undefined || newIndex === undefined) return
        root.children = exchange(root.children!, oldIndex, newIndex)
        emitChange()
      }
    })
  }

  const stopSort = () => {
    sortInstance?.destroy()
    sortInstance = null
  }

  watch(sortable, s => {
    s ? nextTick(() => sort()) : stopSort()
  })

  let sortInstance: Sortable | null = null

  onMounted(() => {
    sort()
  })

  onBeforeUnmount(() => {
    stopSort()
  })

  let currentEditRow: MultipleFormRow | null = null

  watch([() => props.data, () => props.mode], () => {
    currentEditRow = null
  })

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

  const { dialogVisible } = inject(dialogInjectionKey, undefined) || {}

  /**
   * 生成行的原始数据
   */
  const makeRowOriginalData = () => {
    return (props.columns || []).reduce((acc, cur) => {
      let value = cur.defaultValue
      if (value instanceof Function) {
        value = value()
      }
      acc[cur.key] = value
      return acc
    }, {} as Record<string, any>)
  }

  /**
   * 新增行内编辑的行
   * @param parent 父级
   */
  const createInlineEditingRow = (
    parent?: MultipleFormRow | null,
    index?: number
  ) => {
    resetCurrentRow()

    const data = makeRowOriginalData()

    // 在父级下添加子级
    if (parent) {
      const { children } = parent

      currentEditRow = insertTo(
        [...parent.indexes, index ?? children?.length ?? 0],
        data,
        'editing'
      )
    }
    // 在根级添加
    else {
      currentEditRow = insertTo(index ?? root.children!.length, data, 'editing')
    }
  }

  const createDirectEditingRow = (
    parent?: MultipleFormRow | null,
    index?: number
  ) => {
    const data = makeRowOriginalData()
    insertTo(
      parent
        ? [...parent.indexes, index ?? parent.children?.length ?? 0]
        : index ?? root.children!.length,
      data,
      'view'
    )
  }

  /**
   * 新增函数, 用于表头中的根极新增
   */
  const handleCreate = () => {
    const { mode } = props
    if (mode === 'inline') {
      createInlineEditingRow()
      return
    }

    if (mode === 'dialog') {
      return open('create', {
        title: '新增',
        ctx: {
          // 索引路径
          indexes: [root.children!.length],
          /** 索引 */
          index: root.children!.length,
          /** 父级 */
          parent: root
        }
      })
    }

    if (mode === 'direct') {
      createDirectEditingRow()
      return
    }
  }

  /**
   * 在当前行的下方插入行
   * @param row 当前行
   */
  const handleInsert = (row: MultipleFormRow) => {
    const index = row.index + 1
    const { parent } = row
    const { mode } = props
    if (mode === 'inline') {
      return createInlineEditingRow(parent, index)
    }
    if (mode === 'dialog') {
      return open('create', {
        title: '新增',
        ctx: {
          indexes: parent?.indexes ? [...parent.indexes, index] : [index],
          index: row.index + 1,
          parent: parent
        }
      })
    }
    if (mode === 'direct') {
      return createDirectEditingRow(parent, index)
    }
  }

  /** 保存 */
  const handleSave = async (row: MultipleFormRow) => {
    const valid = await validate(row)
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
        indexes: [...row.indexes]
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
    emit('node-change', row, !row.saved ? 'create' : 'update')

    row.status = 'view'
    row.saved = true
    row.prevData = null
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
      if (row.prevData) {
        Object.assign(row.data, row.prevData)
      }

      row.status = 'view'
    }
    row.prevData = null
    currentEditRow = null
  }

  /**
   * 编辑
   * @param row 行
   */
  const handleEdit = (row: MultipleFormRow) => {
    emit('edit', row)

    if (props.mode === 'dialog') {
      open('update', {
        title: '编辑',
        ctx: {
          indexes: row.indexes,
          index: row.index,
          parent: row.parent
        },
        data: row.data
      })
    } else {
      row.prevData = { ...row.data }
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
        indexes: [...row.indexes]
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
    emit('node-change', row, 'delete')
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
    const { mode } = props
    if (mode === 'inline') {
      return createInlineEditingRow(row)
    }
    if (mode === 'dialog') {
      const childIndex = row.children?.length ?? 0
      open('create', {
        title: '新增子级',
        ctx: {
          indexes: [...row.indexes, childIndex],
          index: childIndex,
          parent: row
        }
      })
    }
    if (mode === 'direct') {
      return createDirectEditingRow(row)
    }
  }

  const actionVisible = (type: ActionType, row: MultipleFormRow) => {
    if (typeof type === 'function') return type(row)
    return type
  }
  const cols = computed(() => {
    const {
      columns,
      disabled,
      actionEdit,
      actionDelete,
      actionInsert,
      tree,
      mode
    } = props

    // 操作栏
    const actionColumn: TableColumn<MultipleFormRow> = {
      fixed: 'right',
      key: '$_action',
      align: 'center',
      width: props.actionWidth,
      name: '操作',
      render: ({ row }) => {
        const buttons: JSX.Element[] = []

        // 保存按钮
        row.status === 'editing' &&
          mode === 'inline' &&
          buttons.push(
            <ElButton
              type='primary'
              icon={Select}
              // @ts-ignore
              title='保存'
              link
              loading={row.loading}
              onClick={() => handleSave(row)}
            />,
            <ElButton
              type='primary'
              icon={Close}
              // @ts-ignore
              title='取消'
              loading={row.loading}
              link
              onClick={() => handleClose(row)}
            />
          )

        // 查看状态下显示的按钮
        if (row.status === 'view') {
          mode !== 'direct' &&
            actionVisible(actionEdit, row) &&
            buttons.push(
              <ElButton
                // @ts-ignore
                title='编辑'
                type='primary'
                icon={Edit}
                link
                loading={row.loading}
                onClick={() => handleEdit(row)}
              />
            )

          // 新增子级
          tree &&
            (props.maxDepth !== undefined
              ? props.maxDepth > row.depth
              : true) &&
            buttons.push(
              <ElButton
                // @ts-ignore
                title='新增子级'
                type='primary'
                link
                loading={row.loading}
                icon={AddChild}
                onClick={() => handleCreateChild(row)}
              />
            )

          // 在当前行下方插入
          actionVisible(actionInsert, row) &&
            buttons.push(
              <ElButton
                type='primary'
                icon={Insert}
                // @ts-ignore
                title='在下方插入'
                link
                loading={row.loading}
                onClick={() => handleInsert(row)}
              />
            )

          // 删除按钮
          actionVisible(actionDelete, row) &&
            buttons.push(
              <ElButton
                type='primary'
                icon={Delete}
                // @ts-ignore
                title='删除'
                link
                loading={row.loading}
                onClick={() => handleDelete(row)}
              />
            )
        }

        let actionSlotName = ''
        if (row.status === 'view') {
          actionSlotName = 'action:view-mode'
        } else if (row.status === 'editing') {
          actionSlotName = 'action:edit-mode'
        }
        // ...以后或许会添加其他的
        const actionSlots = actionSlotName
          ? slots[actionSlotName]?.({
              row: row.data,
              index: row.index,
              indexes: [...row.indexes]
            })
          : ''

        return (
          <>
            {actionSlots}
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
      indexColumn.width = 130
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

        const content =
          errTip && (!dialogVisible || dialogVisible.value) ? (
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

        const tip =
          column.tips && (!dialogVisible || dialogVisible.value) ? (
            <ElTooltip effect='dark' content={column.tips} raw-content>
              <ElIcon style='vertical-align: middle'>
                <InfoFilled />
              </ElIcon>
            </ElTooltip>
          ) : null

        const { summary } = column

        return {
          name: () => (
            <>
              {content}
              {tip}
            </>
          ),
          fixed: column.fixed,
          width: column.width,
          align: column.align,
          key: 'data.' + column.key, // data.key才是真实数据
          render: ctx => {
            const { val, row } = ctx

            const params = {
              val,
              v: val,
              node: row,
              row: row.data,
              index: row.index,
              indexes: [...row.indexes]
            }

            // 禁用或者行状态为view（mode为非direct）时显示column.render或者slotView插槽的内容或者key的取值
            if (disabled || (row.status === 'view' && mode !== 'direct')) {
              if (column.render) {
                const ret = column.render(params)
                if (ret instanceof Object) {
                  return isVNode(ret) ? ret : String(ret)
                }
                return ret
              }
              const viewSlot = slots[column.key + ':view']
              return viewSlot?.(params) ?? String(val ?? '')
            }

            return slots[column.key]?.(params) ?? String(val ?? '')
          },
          summary:
            summary === true
              ? summary
              : summary
              ? ({ total, key, data }) =>
                  summary({
                    total,
                    key,
                    data,
                    origin: props.data || []
                  })
              : undefined
        }
      })

    const handleClass = ns.e('sort-handle')
    const sortableColumn: TableColumn<MultipleFormRow>[] = sortable.value
      ? [
          {
            name: '排序',
            key: '$_sort',
            align: 'center',
            fixed: 'left',
            width: 60,
            render: () => (
              <ElIcon class={handleClass}>
                <Rank />
              </ElIcon>
            )
          }
        ]
      : []

    return [
      ...sortableColumn,
      indexColumn,
      ...(disabled ? tableColumns : tableColumns.concat(actionColumn))
    ]
  })

  return {
    cols,
    handleCreate
  }
}
