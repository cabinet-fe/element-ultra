import type { ModelValue } from './form'

/** 校验器 */
export const validators = {
  required(value: any, required: any) {
    let msg = '该项是必填项'
    if (Array.isArray(required)) {
      ;[required, msg] = required
    }

    if (!required) return null

    if (Array.isArray(value) && value.length < 1) {
      return msg
    }

    const type = typeof value

    if (type === 'string' && !value) {
      return msg
    }
    if (value === null || value === undefined) {
      return msg
    }

    return null
  },

  min(value: string | number | any[], min: number | [number, string]) {
    let msg = ''
    if (Array.isArray(min)) {
      ;[min, msg] = min
    }
    const type = typeof value
    if (!(Array.isArray(value) || type === 'number' || type === 'string')) {
      return msg || `该项的类型应为: [string | number | Array], 而不是: ${type}`
    }

    if (type === 'number' && value < min) {
      return msg || `该项的最小值应为: ${min}, 而不是: ${min}`
    }
    if (
      (type === 'string' || Array.isArray(value)) &&
      (value as any).length < min
    ) {
      return msg || `该项的最小长度应为: ${min}, 而不是: ${min}`
    }

    return null
  },
  max(value: ModelValue, max: number | [number, string]) {
    let msg = ''
    if (Array.isArray(max)) {
      ;[max, msg] = max
    }
    const type = typeof value
    if (!(Array.isArray(value) || type === 'number' || type === 'string')) {
      return msg || `该项的类型应为: [string | number | Array], 而不是: ${type}`
    }

    if (type === 'number' && value > max) {
      return msg || `该项的最大值应为: ${max}, 而不是: ${value}`
    }
    if (
      (type === 'string' || Array.isArray(value)) &&
      (value as any).length > max
    ) {
      return (
        msg || `该项的最大长度应为:  ${max}, 而不是: ${(value as any).length}`
      )
    }

    return null
  },
  len(value: string | any[], lenth: number | [number, string]) {
    let msg = ''
    if (Array.isArray(length)) {
      ;[lenth, msg] = lenth
    }
    const type = typeof value

    if (!(Array.isArray(value) || type === 'string')) {
      return msg || `该项的类型应为: [string | Array], 而不是: ${type}`
    }

    if (value.length > lenth) {
      return msg || `该项的长度应为: ${lenth}, 而不是: ${value.length}`
    }

    return null
  },
  match(value: string, pattern: RegExp | [RegExp, string]) {
    let msg = ''
    if (Array.isArray(pattern)) {
      ;[pattern, msg] = pattern
    }
    const type = typeof value
    if (type !== 'string') {
      return msg || `该项的类型应为: [string], 而不是: ${type}`
    }

    if (!pattern.test(value)) {
      return msg || `该项不匹配正则表达式: ${pattern}`
    }

    return null
  },
}
