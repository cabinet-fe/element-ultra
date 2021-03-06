import { useFormDialog } from '@element-ultra/components/form-dialog'
import { useFormModel, type FormModelItem } from '@element-ultra/components/form'
import type { MultipleFormEmits, MultipleFormProps } from './multiple-form'
import type { ShallowRef } from 'vue'

interface Options {
  props: MultipleFormProps
  rows: ShallowRef<any[]>
  emit: MultipleFormEmits
}

export default function useDialogEdit (options: Options) {
  const { props, rows, emit } = options

  const model = props.columns!.reduce((acc, cur) => {
    if (cur.defaultValue instanceof Function) {
      let v = cur.defaultValue()
      if (v instanceof Promise) {
        v.then(result => model[cur.key] = result)
      } else {
        acc[cur.key] = v
      }
    } else {
      acc[cur.key] = { value: cur.defaultValue, ...cur.rules } as any
    }

    return acc
  }, {} as Record<string, FormModelItem>)

  const [form, rules] = useFormModel(model)

  const [dialog, open] = useFormDialog(form) as any


  const submit = () => {
    const { ctx } = dialog
    let data = { ...form }
    if (dialog.type === 'create') {

      rows.value.splice(ctx.index + 1, 0, data)
    } else {
      rows.value.splice(ctx.index, 1, data)
    }
    emit('save', data, rows.value)
    emit('change', rows.value)
  }

  return {
    open,
    dialog,
    rules,
    form,

    submit
  }
}
