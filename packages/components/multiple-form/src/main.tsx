import { defineComponent, shallowRef } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { multipleFormEmits, multipleFormProps } from './type'
import { ElTable } from '@element-ultra/components/table'
import { ElFormDialog } from '@element-ultra/components/form-dialog'
import { ElForm } from '@element-ultra/components/form'
import useRows from './use-rows'
import useColumns from './use-columns'
import useInlineEdit from './use-inline-edit'
import useDialogEdit from './use-dialog-edit'
import { flatTree } from './utils'

export default defineComponent({
  name: 'ElMultipleForm',

  inheritAttrs: false,

  props: multipleFormProps,

  emits: multipleFormEmits,

  setup(props, { emit, slots }) {
    const ns = useNamespace('multiple-form')

    // 表格引用
    const tableRef = shallowRef<InstanceType<typeof ElTable>>()

    // 行数据
    const { root, delRow, find, insertTo } = useRows({
      props,
      emit,
      tableRef
    })

    // 弹框编辑
    const { dialog, submit, form, rules, open } = useDialogEdit({
      props,
      insertTo,
      root,
      emit
    })

    // 行内编辑
    const { errorTips, validate, createInlineRow, clearValidate } =
      useInlineEdit({
        props,
        insertTo,
        root
      })

    /** 列 */
    const cols = useColumns({
      props,
      emit,
      validate,
      errorTips,
      createInlineRow,
      open,
      delRow,
      slots,
      ns,
      root
    })

    const changeDialog = (visible: boolean) => {
      dialog.visible = visible
    }

    return {
      ns,
      changeDialog,
      /** 查找数据 */
      find,
      /** 删除数据 */
      delete: delRow,
      /** 插入数据 */
      insertTo,
      /** 校验数据 */
      validate: async function () {
        const data = flatTree(root.children!.map(item => item.data))
        return validate(data)
      },
      /** 清楚校验 */
      clearValidate,
      open,
      cols,
      root,
      submit,
      form,
      rules,
      dialog,
      slots,
      /** 表格ref */
      tableRef
    }
  },

  render() {
    const {
      title,
      ns,
      cols,
      root,
      dialog,
      form,
      submit,
      changeDialog,
      dialogWidth,
      rules,
      slots
    } = this

    return (
      <>
        <div class={ns.b()}>
          {title ? <div class={ns.e('title')}>{title}</div> : null}
          {slots.tools ? (
            <div class={ns.e('tools')}>{slots.tools()}</div>
          ) : null}

          <ElTable
            columns={cols}
            data={flatTree(root.children!)}
            style='height: 400px'
            ref='tableRef'
          ></ElTable>
        </div>

        <ElFormDialog
          modelValue={dialog.visible}
          onUpdate:modelValue={changeDialog}
          title={dialog.title}
          confirm={submit}
          continue={dialog.type === 'create'}
          width={dialogWidth}
        >
          <ElForm data={form} rules={rules} label-width='100px'>
            {slots.default?.({ form })}
          </ElForm>

          {slots.dialog?.({ form })}
        </ElFormDialog>
      </>
    )
  }
})
