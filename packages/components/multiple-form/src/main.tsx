import {
  defineComponent,
  onBeforeUnmount,
  shallowRef,
  watch,
  inject
} from 'vue'
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
import { formInjectionKey } from '@element-ultra/tokens'

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
    const { root, delRow, find, insertTo, update, emitChange } = useRows({
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
    const { errorTips, validate, clearValidate } = useInlineEdit({
      props
    })

    /** 列 */
    const { cols, handleCreate } = useColumns({
      props,
      ns,
      errorTips,
      root,
      slots,
      tableRef,
      validate,
      emit,
      open,
      delRow,
      insertTo,
      emitChange
    })

    const changeDialog = (visible: boolean) => {
      dialog.visible = visible
    }

    // 计算表格的高度

    /** title和tools的累积高度 */
    const accHeight = shallowRef(0)
    const titleDom = shallowRef<HTMLElement>()
    const toolsDom = shallowRef<HTMLElement>()

    const obs = new ResizeObserver(entries => {
      accHeight.value = entries.reduce(
        (acc, cur) => acc + cur.contentRect.height,
        0
      )
    })

    watch(titleDom, (dom, oldDom) => {
      oldDom && obs.unobserve(oldDom)
      dom && obs.observe(dom)
    })

    watch(toolsDom, (dom, oldDom) => {
      oldDom && obs.unobserve(oldDom)
      dom && obs.observe(dom)
    })

    onBeforeUnmount(() => {
      titleDom.value && obs.unobserve(titleDom.value)
      toolsDom.value && obs.unobserve(toolsDom.value)
      obs.disconnect()
    })

    // 尝试往formDialog, page组件中注册自己
    const formInjection = inject(formInjectionKey, null)

    const exposed = {
      /** 校验数据 */
      validate: () => validate(root.children!)
    }

    if (formInjection) {
      formInjection.addMultipleForm?.(exposed)

      onBeforeUnmount(() => {
        formInjection.deleteMultipleForm?.(exposed)
      })
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
      /** 更新数据 */
      update,
      ...exposed,
      /** 清楚校验 */
      clearValidate,
      open,
      /** 新增 */
      handleCreate,
      cols,
      root,
      submit,
      form,
      rules,
      dialog,
      slots,
      /** 表格ref */
      tableRef,
      toolsDom,
      titleDom,
      accHeight
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
      handleCreate,
      dialogWidth,
      rules,
      slots,
      accHeight,
      mode,
      disabled,
      tree
    } = this

    return (
      <>
        <div {...this.$attrs} class={ns.b()}>
          {title ? (
            <div class={ns.e('title')} ref='titleDom'>
              {title}
            </div>
          ) : null}
          {slots.tools ? (
            <div class={ns.e('tools')} ref='toolsDom'>
              {slots.tools()}
            </div>
          ) : null}

          <ElTable
            columns={cols}
            data={tree ? flatTree(root.children!) : root.children}
            ref='tableRef'
            rowClass={this.rowClass}
            style={{
              height: (this.$attrs.style as any)?.height
                ? `calc(100% - ${accHeight}px)`
                : undefined
            }}
            rowKey='uid'
            v-slots={{
              append: () =>
                disabled || !this.actionAdd ? null : (
                  <div class={ns.e('btn-add')} onClick={handleCreate}>
                    <span>新 增</span>
                  </div>
                )
            }}
          ></ElTable>
        </div>

        {mode === 'dialog' ? (
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
        ) : null}
      </>
    )
  }
})
