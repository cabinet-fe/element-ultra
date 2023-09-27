export type OptionCommon = {
  label: string
}

export type Option<T = any> = OptionCommon & {
  created?: boolean
  value: T
  isTitle: boolean
  type?: 'Group'
  // reserve for option
  [prop: string]: any
}

export type OptionGroup<T = any> = OptionCommon & {
  options: Array<T>

  // reserve for flexibility
  [prop: string]: any
}

export type OptionType = Option | OptionGroup<Option>

// maybe adding T for type restriction is better here, but not sure this is going to work for
// template rendering
export type OptionItemProps = {
  item: any
  index: number
  disabled: boolean
}
