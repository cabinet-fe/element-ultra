import { useFormDialog } from 'components/form-dialog'
import {
  useFormModel,
  type FormModelItem
} from 'components/form'
import type {
  MultipleFormColumn,
  MultipleFormEmits,
  MultipleFormProps,
  MultipleFormRow
} from './type'
import type useRows from './use-rows'

interface Options {
  /** 对象属性 */
  props: MultipleFormProps
  root: MultipleFormRow
  emit: MultipleFormEmits
  /** 插入数据 */
  insertTo: ReturnType<typeof useRows>['insertTo']
}

export default function useDialogEdit(options: Options) {
  const { props, insertTo, emit, root } = options

  // 根据列生成数据模型
  const getModel = (columns: MultipleFormColumn[]) => {
    const model = {} as Record<string, FormModelItem>
    // 将列转化为表单的模型校验
    columns.forEach(column => {
      let { defaultValue } = column
      // 引用类型需要
      if (defaultValue instanceof Function) {
        let v = defaultValue()
        model[column.key] = { value: v, ...column.rules } as any
      } else {
        model[column.key] = {
          value: column.defaultValue,
          ...column.rules
        } as any
      }

      // 如果有嵌套
      if (column.nest) {
        model[column.key].children = getModel(column.nest)
      }
    })

    return model
  }

  const model = getModel(props.columns!)

  const [form, rules] = useFormModel(model)

  const [dialog, open] = useFormDialog(form)

  const submit = async () => {
    const { ctx, type } = dialog
    const { index, indexes, parent } = ctx
    const { saveMethod } = props

    // 因为所有行的model共用同一个, 因此在提交时需要深拷贝一份出来
    let data = JSON.parse(JSON.stringify(form))

    // 如果有saveMethod使用saveMethod
    if (saveMethod) {
      const result = await saveMethod({
        data,
        index,
        indexes,
        parent,
        rows: root.children!,
        type: dialog.type
      })

      // 返回的值为false则视为终止提交
      if (result === false) {
        return
      }
      // 使用返回的数据作为data
      if (result && typeof result === 'object') {
        data = result
      }
    }

    emit('save', data, props.data!, type!)
    const row = insertTo(
      indexes,
      data,
      'view',
      type === 'create' ? false : true
    )
    emit('node-change', row, type)
  }

  return {
    open,
    dialog,
    rules,
    form,

    submit
  }
}
