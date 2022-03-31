
export type OptionGroup<T = any> ={
  options: Array<T>

  // reserve for flexibility
  [prop: string]: any
}

export type OptionType<T = any> = T | OptionGroup<T>

// maybe adding T for type restriction is better here, but not sure this is going to work for
// template rendering
export type OptionItemProps = {
  item: any
  index: number
  disabled: boolean
}
