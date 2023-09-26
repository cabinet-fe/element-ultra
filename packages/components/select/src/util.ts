import type { Option, OptionGroup } from './select.types'

/**
 * 选项碾平, 主要是碾平可能存在的分组
 * @param options 选项
 */
export const flattenOptions = (
  options: Array<Option | OptionGroup<Option>>
) => {
  const flattened: Option[] = []
  options.forEach(option => {
    if (Array.isArray(option.options)) {
      // 分组标题
      flattened.push({
        label: option.label,
        isTitle: true,
        type: 'Group',
        value: option.value
      })
      // 分组项
      option.options.forEach((o: Option) => {
        flattened.push(o)
      })
      // 分割线
      flattened.push({
        type: 'Group',
        isTitle: false,
        value: null,
        label: ''
      })
    } else {
      flattened.push(option as Option)
    }
  })

  return flattened
}
