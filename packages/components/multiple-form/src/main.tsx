import { defineComponent } from 'vue'
import { useNamespace } from '@element-ultra/hooks'
import { multipleFormEmits, multipleFormProps } from './multiple-form'
import { ElTable } from '@element-ultra/components/table'
import { ElFormDialog } from '@element-ultra/components/form-dialog'
import { ElForm } from '@element-ultra/components/form'
import useColumns from './use-columns'
import useInlineEdit from './use-inline-edit'
import useRows from './use-rows'
import useDialogEdit from './use-dialog-edit'
import { flatTree } from './utils'

export default defineComponent({
  name: 'ElMultipleForm',
  inheritAttrs: false,

  props: multipleFormProps,

  emits: multipleFormEmits,

  setup(props, { emit, slots, expose }) {
    const ns = useNamespace('multiple-form')

    const { root, handleCreateRow, delRow, find, insertTo } = useRows({
      props,
      emit
    })

    const { dialog, submit, form, rules, open } = useDialogEdit({
      props,
      insertTo,
      root,
      emit
    })

    // 行内编辑
    const { errorTips, validate } = useInlineEdit({
      props
    })

    /** 列 */
    const cols = useColumns({
      props,
      emit,
      validate,
      errorTips,
      handleCreateRow,
      open,
      delRow,
      slots,
      ns,
      root
    })

    expose({
      /** 查找数据 */
      find,
      /** 删除数据 */
      delete: delRow,
      /** 插入数据 */
      insertTo,
      /** 校验数据 */
      validate: async function () {
        const data = flatTree(root.children!)
        const allValid = await Promise.all(
          data.map(async item => {
            const valid = await validate(item.data)
            if (valid) {
              item.status = 'view'
            }
            return valid
          })
        ).then(rets => rets.every(ret => ret))

        return allValid
      },

      open
    })

    const changeDialog = (visible: boolean) => {
      dialog.visible = visible
    }

    return () => {
      return (
        <>
          <div>
            {props.title ? (
              <div class={ns.e('title')}>{props.title}</div>
            ) : null}
            {slots.tools ? (
              <div class={ns.e('tools')}>{slots.tools()}</div>
            ) : null}

            <ElTable
              columns={cols.value}
              data={root.children}
              style='height: 400px'
            ></ElTable>
          </div>

          <ElFormDialog
            modelValue={dialog.visible}
            onUpdate:modelValue={changeDialog}
            title={dialog.title}
            confirm={submit}
            continue={dialog.type === 'create'}
            width={props.dialogWidth}
          >
            <ElForm data={form} rules={rules} label-width='100px'>
              {slots.default?.({ form })}
            </ElForm>
            {slots.dialog?.({ form })}
          </ElFormDialog>
        </>
      )
    }
  }
})
